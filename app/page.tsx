'use client';
import { useRouter } from 'next/navigation';
import Cell from '@/app/components/Cell';
import { useEffect, useRef, useState } from 'react';

const MAP_SIZE = 3;

export default function Home() {

    const [state, setState] = useState({
        gameInProgress: false,
        timer: 0,
        map: [ ...Array(MAP_SIZE) ].map(() => {
            return [
                ...Array(MAP_SIZE),
            ].map(() => ({visible: false}))
        })
    });

    const currentTimer = useRef();
    useEffect(() => {
        return () => clearInterval(currentTimer.current);
    }, []);

    const startTimer = () => {
        currentTimer.current = window.setInterval(() => {
            tick();
            // const newMap = tick();
            // setState({
            //     ...state,
            //     map: newMap,
            // })
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(currentTimer.current);
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
        console.log(rowIndexRnd, cellIndexRnd);
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

        console.log('new map', newMap);

        // setState({
        //     ...state,
        //     map: newMap,
        // });


        console.log(state.gameInProgress, state);
        // state.map[rowIndex][cellIndex].visible = !state.map[rowIndex][cellIndex].visible;

        return newMap;
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
                        { state.map.map((cell, cellIndex) => <Cell key={ `${ rowIndex }_${ cellIndex }` }/>) }
                    </div>;
                }) }
            </div>
            <div className="debug">
                <span>Game Tick</span><span>{ state.timer }</span>
            </div>
        </div>
    );
}
