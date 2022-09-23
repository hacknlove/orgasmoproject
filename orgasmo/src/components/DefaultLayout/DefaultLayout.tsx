import type { ReactNode } from 'react';

export default function DefaultLayout ({ cssVars, areas }) {
    return (<div style={cssVars}>
        {Object.entries(areas).map(([key, value]) => (
            <div key={key} id={key}>
                {value as ReactNode}
            </div>
        ))}
    </div>)
}