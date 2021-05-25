import styles from "./StopWatch.module.css"
import React, { useEffect, useState } from 'react';
import { interval, Subject } from "rxjs"
import { takeUntil } from "rxjs/operators";


const StopWatch = () => {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [status, setStatus] = useState("stop")

    useEffect(() => {
        const subject$ = new Subject()

        interval(1000)
            .pipe(takeUntil(subject$))
            .subscribe(() => {
                if (status === "start") {
                    setSeconds(v => v + 1)
                }
                if (seconds === 60) {
                    setMinutes(v => v + 1)
                    setSeconds(v => 0 + 1)
                }
                if (minutes === 60) {
                    setHours(v => v + 1)
                    setMinutes(v => 0 + 1)
                }
            })

        return () => {
            subject$.next()
            subject$.complete()
        }
    }, [status, seconds, minutes])

    const handlerStart = () => {
        if (status === "stop") {
            setStatus("start")
        } else if (status === "start") {
            setStatus("stop")
            setSeconds(0)
        }
    }
    const handleWait = () => {

    }
    const handleReset = () => {
        setSeconds(0)
    }
    return (
        <>
            <div className={styles.timer}>
                <div className={styles.field}>
                    <span className={styles.value} >{hours < 10 ? "0" + hours : hours}</span>
                    <span className={styles.label}>Hours</span>
                </div>

                <div className={styles.field}>
                    <span className={styles.value} >{minutes < 10 ? "0" + minutes : minutes}</span>
                    <span className={styles.label}>Minutes</span>
                </div>

                <div className={styles.field}>
                    <span className={styles.value} >{seconds < 10 ? "0" + seconds : seconds}</span>
                    <span className={styles.label}>Seconds</span>
                </div>
            </div>
            <div className={styles.btnGroup}>
                <button className={styles.button} onClick={handlerStart}>Start/Stop</button>
                <button className={styles.button} onClick={handleWait}>Wait</button>
                <button className={styles.button} onClick={handleReset}>Reset</button>
            </div>
        </>
    );
};

export default StopWatch;