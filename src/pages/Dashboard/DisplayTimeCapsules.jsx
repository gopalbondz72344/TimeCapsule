

const DisplayTimeCapsules = () => {
    const timeCapsules = [
        { id: 1, title: 'Time Capsule 1', content: 'A letter to my future self.' },
        { id: 2, title: 'Time Capsule 2', content: 'A list of goals for the next decade.' },
        { id: 3, title: 'Time Capsule 3', content: 'A video message for my family.' },
    ];

    return (
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">List of Time Capsules</h3>
            <ul>
                {timeCapsules.map((capsule) => (
                    <li key={capsule.id} className="mb-2">
                        <div className="font-medium">{capsule.title}</div>
                        <div className="text-sm text-gray-600">{capsule.content}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DisplayTimeCapsules