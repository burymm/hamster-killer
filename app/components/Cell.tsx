import { useState } from 'react';

const Cell = () => {

    const [isShow, setIsShow] = useState(false);

    function handleClick() {
        setIsShow(!isShow)
    }

    return (
        <div onClick={handleClick}>
            <div className={`${isShow ? 'show' : ''} image-container`}>

            </div>
            Cell={isShow.toString()}=
        </div>
    );
}

export default Cell;