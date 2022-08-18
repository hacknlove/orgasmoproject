export default function Item ({ string, number, className }) {
    number = number + 15;
    const letters = string.substring(0, 6)
    return (
        <div className={className} style={{
            overflow: 'hidden',
        }}>
            <div className="Item">
                <div>
                    {
                        letters.split('').map((char, index) => {
                            return <span
                                key={char + index}
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${number * string.charCodeAt(index + 3)}rad)`,
                                    color: `rgb(${
                                        number * string.charCodeAt(index + 4) % 255
                                    }, ${

                                        number * string.charCodeAt(index + 5) % 255
                                    }, ${
                                        number * string.charCodeAt(index + 6) % 255
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