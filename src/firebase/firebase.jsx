/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged, 
    signOut 
} from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    getDoc, 
    updateDoc, 
    query, 
    where 
} from 'firebase/firestore';
import { 
    getStorage, 
    ref, 
    uploadBytes, 
    uploadBytesResumable,
    getDownloadURL 
} from 'firebase/storage';
import JSZip from 'jszip';

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseapp = initializeApp(firebaseConfig);
const firebaseauth = getAuth(firebaseapp);
const firestore = getFirestore(firebaseapp);
const storage = getStorage(firebaseapp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        onAuthStateChanged(firebaseauth, (user) => {
            setUser(user);
            setLoading(false)
        });
    }, []);

    const signupUserWithEmailAndPassword = async (email, password) => {
        setLoading(true); // Set loading to true during signup
        try {
            const result = await createUserWithEmailAndPassword(firebaseauth, email, password);
            setLoading(false); // Set loading to false on success
            return result;
        } catch (error) {
            setLoading(false); // Set loading to false on error
            throw error;
        }
    };

    const signinUserWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(firebaseauth, email, password);
    };

    const signinWithGoogle = () => signInWithPopup(firebaseauth, googleProvider);

    const logout = () => {
        return signOut(firebaseauth);
    };

    const createBox = async ({ title, description, files, user }) => {
        try {
            const fileUrls = [];
            const protectedFiles = [];

            // Check each file for password protection and upload to Firebase Storage
            for (let file of files) {
                const isProtected = await isZipPasswordProtected(file);
                if (isProtected) {
                    protectedFiles.push(file.name);
                }

                // Upload the file to Firebase Storage
                const fileRef = ref(storage, `uploads/${file.name}`);
                const uploadTask = uploadBytesResumable(fileRef, file);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {},
                    (error) => {
                        console.error('Error uploading file:', error);
                        throw error; // Stop if there is an error uploading
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            fileUrls.push(url); // Store the file URL
                        });
                    }
                );
            }

            // Wait for all uploads to complete
            await Promise.all(
                files.map((file) => uploadBytesResumable(ref(storage, `uploads/${file.name}`), file))
            );

            // Create a new box in Firestore
            const newBox = await addDoc(collection(firestore, '/boxes'), {
                title,
                description,
                createdAt: new Date().toISOString(),
                ownerID: user.uid,
                files: fileUrls,
                protectedFiles: protectedFiles,
            });

            return newBox;
        } catch (error) {
            console.error('Error creating box:', error);
            throw error;
        }
    };

    // Helper function to check if the ZIP file is password protected
    const isZipPasswordProtected = async (file) => {
        const zip = new JSZip();
        try {
            const zipData = await file.arrayBuffer(); // Read file as ArrayBuffer
            await zip.loadAsync(zipData); // Try to load the zip file content
            return false; // If it loads without error, it's not password-protected
        } catch (error) {
            console.error('Error reading ZIP file:', error);
            return true; // If it fails, it's likely password-protected
        }
    };

    const addUserDetails = (userId, userDetails) => {
            return addDoc(collection(firestore, 'users'), {
                userId,
                ...userDetails
            });
        };
    
        const getUserDetails = async (userId) => {
            const userDoc = await getDoc(doc(firestore, 'users', userId));
            return userDoc.exists() ? userDoc.data() : null;
        };

        const getUserBoxes = async (userId) => {
            const q = query(collection(firestore, 'boxes'), where('userID', '==', userId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        };
        const getBoxById = async (id) => {
            const docRef = doc(firestore, 'boxes',id);
            const result = await getDoc(docRef);
            return result;
        };
        const getUserTimeCapsule = async (userId) => {
            const q = query(collection(firestore, 'timecapsule'), where('userID', '==', userId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        };
        const getTimeCapsuleById = async (id) => {
            const docRef = doc(firestore, 'timecapsule',id);
            const result = await getDoc(docRef);
            return result;
        }
    // // Time Capsule-Specific Methods
    // const createTimeCapsule = async ({ title, description, unlockDate, riddle, participants }) => {
    //     try {
    //         const newCapsule = await addDoc(collection(firestore, 'timeCapsules'), {
    //             title,
    //             description,
    //             unlockDate,
    //             riddle,
    //             status: 'locked',
    //             ownerID: user.uid,
    //             participants,
    //             createdAt: new Date().toISOString(),
    //         });
    //         return newCapsule;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    // const listTimeCapsules = async () => {
    //     const q = query(collection(firestore, 'timeCapsules'), where('participants', 'array-contains', user.uid));
    //     const querySnapshot = await getDocs(q);
    //     return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // };

    // const getTimeCapsuleById = async (id) => {
    //     const capsuleDoc = await getDoc(doc(firestore, 'timeCapsules', id));
    //     return capsuleDoc.exists() ? { id: capsuleDoc.id, ...capsuleDoc.data() } : null;
    // };

    // const updateTimeCapsule = async (id, updates) => {
    //     await updateDoc(doc(firestore, 'timeCapsules', id), updates);
    // };

    // Box-Specific Methods
    // const createBox = async ({  title, description }) => {
    //     try {
    //         const newBox = await addDoc(collection(firestore, `/boxes`), {
    //             title,
    //             description,
    //             createdAt: new Date().toISOString(),
    //             ownerID: user.uid
    //         });
    //         return newBox;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    // const listBoxes = async (capsuleId) => {
    //     const q = query(collection(firestore, `/boxes`));
    //     const querySnapshot = await getDocs(q);
    //     return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // };

    // const getBoxById = async (capsuleId, boxId) => {
    //     const boxDoc = await getDoc(doc(firestore, `timeCapsules/${capsuleId}/boxes`, boxId));
    //     return boxDoc.exists() ? { id: boxDoc.id, ...boxDoc.data() } : null;
    // };

    // const uploadFileToBox = async (capsuleId, boxId, file) => {
    //     const fileRef = ref(storage, `timeCapsules/${capsuleId}/boxes/${boxId}/files/${Date.now()}-${file.name}`);
    //     const uploadResult = await uploadBytes(fileRef, file);
    //     const downloadURL = await getDownloadURL(uploadResult.ref);
    //     return downloadURL;
    // };

    // // User Methods
    //
    // };

    // const listAllUsers = async () => {
    //     const usersSnapshot = await getDocs(collection(firestore, 'users'));
    //     return usersSnapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
    // };

    // const getUserCount = async () => {
    //     const usersSnapshot = await getDocs(collection(firestore, 'users'));
    //     return usersSnapshot.size;
    // };

    return (
        <FirebaseContext.Provider
            value={{
                user,
                setUser, 
                signinWithGoogle,
                signupUserWithEmailAndPassword,
                signinUserWithEmailAndPassword,
                logout,
                createBox,
                loading,
                // createTimeCapsule,
                // listTimeCapsules,
                // getTimeCapsuleById,
                // updateTimeCapsule,
                // createBox,
                // listBoxes,
                // getBoxById,
                // uploadFileToBox,
                addUserDetails,
                getUserDetails,
                // listAllUsers,
                // getUserCount,
                getBoxById,
                getUserBoxes,
                getUserTimeCapsule,
                getTimeCapsuleById,
                isLoggedIn: !!user
            }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};
