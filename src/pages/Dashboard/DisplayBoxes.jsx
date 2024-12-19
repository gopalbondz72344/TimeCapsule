

const DisplayBoxes = () => {
    const boxes = [
        { id: 1, name: 'Box 1', description: 'A box for important memories.' },
        { id: 2, name: 'Box 2', description: 'A box for digital items.' },
        { id: 3, name: 'Box 3', description: 'A box for photos.' },
    ];

    return (
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">List of Boxes</h3>
            <ul>
                {boxes.map((box) => (
                    <li key={box.id} className="mb-2">
                        <div className="font-medium">{box.name}</div>
                        <div className="text-sm text-gray-600">{box.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DisplayBoxes