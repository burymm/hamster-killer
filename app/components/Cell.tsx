import { useEffect, useState } from 'react';

interface CellProps {
    visible: boolean;
    className: string;
}

const Cell = ({visible = false, className}: CellProps) => {

    const [isShow, setIsShow] = useState(visible);

    useEffect(() => {
        setIsShow(visible);
    }, [visible])

    function handleClick() {
        setIsShow(!isShow)
    }

    return (
        <div className={className} onClick={handleClick}>
            <div className={`${isShow ? 'show' : ''} image-container`}>

            </div>
        </div>
    );
}

export default Cell;