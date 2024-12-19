import { Outlet } from 'react-router-dom';
import Button from '../../components/Button';
import DisplayBoxes from './DisplayBoxes';
import DisplayTimeCapsules from './DisplayTimeCapsules';
 

const Dashboard = () => {

    return (
        <>
            <div>
                <div className="flex justify-center items-center bg-[#01112E] min-h-screen">
                    <div className="text-center text-white">
                        <div className="grid grid-cols-2 gap-6">
                            <Button name="Box" baseRoute="/createBox"  />
                            <Button name="Time Capsule" baseRoute="/createCapsule" />
                            <DisplayBoxes />
                            <DisplayTimeCapsules />
                        </div>
                    </div>
                </div>
                <Outlet /> {/* This renders nested routes */}
            </div>
        </>
    );
};

export default Dashboard;
