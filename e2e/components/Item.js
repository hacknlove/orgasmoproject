export default function Item ({ string, number }) {
    string = string.substring(0, 3)
    const length = 3;
    return (
        <div style={{
            overflow: 'hidden',
        }}>
            <div className="Item">
                <div>
                    {
                        string.split('').map((char, index) => {
                            return <span
                                key={char + index}
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${360 * index / length + number * 42}deg)`,
                                    color: `rgb(${
                                        string.charCodeAt(index) % 255
                                    }, ${

                                        string.charCodeAt(index + 1) % 255 || 128
                                    }, ${
                                        string.charCodeAt(index + 2) % 255 || 128
                                    })`
                                }}
                            >{char}</span>
                        })
                    }
                </div>
            </div>
        </div>
    )
}