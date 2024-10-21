'use client';
import { useRouter } from 'next/navigation';
import Cell from '@/app/components/Cell';
import { useEffect, useRef, useState } from 'react';

const MAP_SIZE = 3;

export default function Home() {

    const [state, setState] = useState({
        gameInProgress: false,
        timer: 0,
        mapCopy: [],
        map: [ ...Array(MAP_SIZE) ].map(() => {
            return [
                ...Array(MAP_SIZE),
            ].map(() => ({visible: false}))
        })
    });

    let currentTimer: number;
    useEffect(() => {
        return () => clearInterval(currentTimer);
    }, []);

    const startTimer = () => {
        currentTimer = window.setInterval(() => {
            tick();
            // const newMap = tick();
            // setState({
            //     ...state,
            //     map: newMap,
            // })
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(currentTimer);
    };

    const router = useRouter();

    function startGameClick() {
        setState({
            ...state,
            gameInProgress: !state.gameInProgress,
        });
        if (state.gameInProgress) {
            console.log('stop game', state.gameInProgress)
            stopTimer();
        } else {
            console.log('start game', state.gameInProgress)
            startTimer();
        }
    }

    function tick() {
        console.log('game tick');
        let rowIndexRnd = Math.abs(Math.round(Math.random() * MAP_SIZE - 1));
        rowIndexRnd = (rowIndexRnd < 0) ? 0 : rowIndexRnd;
        let cellIndexRnd = Math.abs(Math.round(Math.random() * MAP_SIZE - 1));
        cellIndexRnd = cellIndexRnd < 0 ? 0 : cellIndexRnd;
        const newMap = state.map.map((row, rowIndex) => {
            return [
                ...row.map((cell, cellIndex) => {
                    return {
                        ...cell,
                        visible: rowIndexRnd === rowIndex && cellIndexRnd === cellIndex ? !cell.visible : cell.visible,
                    }
                }),
            ]
        });
        setState((prevState) => ({
            ...prevState,
            map: [...newMap]
        }));
    }


    return (
        <div className="m-5">
            <button type="button" className="mb-8 mr-5" onClick={ () => router.push('/dashboard') }>
                Dashboard
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={ startGameClick }> {state.gameInProgress ? 'Reset' : 'Start game'}</button>
            <div className="playground grid grid-cols-4 gap-4">
                { state.map.map((row, rowIndex) => {
                    return <div key={ rowIndex }>
                        { row.map((cell, cellIndex) => <Cell className="mb-5" visible={cell.visible} key={ `${ rowIndex }_${ cellIndex }` }/>) }
                    </div>;
                }) }
            </div>
            <div className="debug">
                <span>Game Tick</span><span>{ state.timer }</span>
            </div>
        </div>
    );
}
