import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'

import { useLessonContext } from '../../../../app/contexts/lesson';
import { LessonInterface } from '../../../../app/models/lesson';

type LessonType = LessonInterface & { _id: string, link: string }

export default function Listen({ episode, subtitle, description, link, audio: url }: LessonType) {
    const { active, setActive } = useLessonContext();

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [length, setLength] = useState(0);
    const [time, setTime] = useState(0);
    const [slider, setSlider] = useState<string | number>(0);
    const [drag, setDrag] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [rate, setRate] = useState(1);
    let [end, setEnd] = useState(0);

    const fmtMSS = (s: number) => new Date(1000 * s).toISOString().substring(11, 19);

    useEffect(() => {
        const audio = new Audio(url);

        const setAudioData = () => {
            setLength(audio.duration);
            setTime(audio.currentTime);
        };

        const setAudioTime = () => {
            const curTime = audio.currentTime;
            setTime(curTime);
            setSlider(curTime ? ((curTime * 100) / audio.duration).toFixed(1) : 0);
        };

        const setAudioVolume = () => setVolume(audio.volume);

        const setAudioRate = () => setRate(audio.playbackRate);

        const setAudioEnd = () => setEnd((end += 1));

        // events on audio object
        audio.addEventListener("loadeddata", setAudioData);
        audio.addEventListener("timeupdate", setAudioTime);
        audio.addEventListener("volumechange", setAudioVolume);
        audio.addEventListener("ratechange", setAudioRate);
        audio.addEventListener("ended", setAudioEnd);

        setAudio(audio);

        audio.play()
        audio.volume = volume
        audio.playbackRate = rate
        setActive(true)

        return () => {
            audio.pause();

            setAudio(null)
            setActive(false)
            setLength(0)
            setTime(0)
            setDrag(0)
            setSlider(0)
            setEnd(0)
        };
    }, [url, setActive]);

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
    }, [end]);

    useEffect(() => {
        if (audio != null) {
            if (active) audio.play()
            else audio.pause()
        }
    }, [active])

    useEffect(() => {
        if (audio != null) {
            audio.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audio != null) {
            audio.playbackRate = rate;
        }
    }, [rate]);

    useEffect(() => {
        if (audio != null) {
            pause();
            const val = Math.round((+drag * audio.duration) / 100);
            audio.currentTime = val;
        }
    }, [drag]);

    const play = () => {
        setActive(true);
        audio!.play();
    };

    const pause = () => {
        setActive(false);
        audio!.pause();
    };

    const mute = () => setVolume(0)

    const unmute = () => setVolume(0.8)

    const speed = () => {
        if (rate === 1) changeRate(1.5)
        else if (rate === 1.5) changeRate(2)
        else changeRate(1)
    }

    const changeTime = (newTime: number) => {
        audio!.currentTime = newTime
        setTime(newTime)
        setDrag(Math.round(newTime / (length * 100)))
        setSlider(newTime ? ((newTime * 100) / audio!.duration).toFixed(1) : 0)
    }

    const changeRate = (newRate: number) => {
        audio!.playbackRate = newRate
        setRate(newRate)
    }

    const rewind10 = () => time > 10 ? changeTime(time - 10) : changeTime(0)

    const forward10 = () => time < length - 10 ? changeTime(time + 10) : changeTime(length)

    return <div className="sticky bottom-0 z-10 bg-white dark:bg-secondary-900 py-4 px-4 shadow shadow-secondary-200/80 ring-1 ring-secondary-900/5 backdrop-blur-sm md:px-6">
        <div className="container flex items-center gap-6">
            <div className="hidden md:block">
                <button type="button" onClick={active ? pause : play} className="group relative flex flex-shrink-0 items-center justify-center rounded-full bg-secondary-700 hover:bg-secondary-900 focus:outline-none focus:ring-secondary-700 h-14 w-14 focus:ring-2 focus:ring-offset-2" aria-label="Play">
                    <div className="absolute -inset-3 md:hidden" />

                    {!active ? <svg aria-hidden="true" viewBox="0 0 36 36" className="fill-white group-active:fill-white/80 h-7 w-7">
                        <path d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z" />
                    </svg> : <svg aria-hidden="true" viewBox="0 0 22 28" className="fill-white group-active:fill-white/80 h-5 w-5">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.5 0C0.671573 0 0 0.671572 0 1.5V26.5C0 27.3284 0.671573 28 1.5 28H4.5C5.32843 28 6 27.3284 6 26.5V1.5C6 0.671573 5.32843 0 4.5 0H1.5ZM17.5 0C16.6716 0 16 0.671572 16 1.5V26.5C16 27.3284 16.6716 28 17.5 28H20.5C21.3284 28 22 27.3284 22 26.5V1.5C22 0.671573 21.3284 0 20.5 0H17.5Z" />
                    </svg>}
                </button>
            </div>

            <div className="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
                <Link href={link} className="truncate text-center text-sm font-bold leading-6 md:text-left text-secondary-900 dark:text-secondary-50" title={`${episode}:  ${subtitle} - ${description}`}>{episode}: {subtitle} - {description}</Link>

                <div className="flex justify-between gap-6">
                    <div className="flex items-center md:hidden">
                        <button type="button" onClick={volume > 0 ? mute : unmute} className="group relative rounded-md hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2 md:order-none" aria-label="Mute">
                            <div className="absolute -inset-4 md:hidden" />

                            {volume > 0 ? <svg aria-hidden="true" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 fill-secondary-500 stroke-secondary-500 group-hover:fill-secondary-700 group-hover:stroke-secondary-700">
                                <path d="M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z" />
                                <path d="M17 7C17 7 19 9 19 12C19 15 17 17 17 17" fill="none" />
                                <path d="M15.5 10.5C15.5 10.5 16 10.9998 16 11.9999C16 13 15.5 13.5 15.5 13.5" fill="none" />
                            </svg> : <svg aria-hidden="true" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 fill-slate-500 stroke-slate-500 group-hover:fill-slate-700 group-hover:stroke-slate-700">
                                <path d="M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z" />
                                <path d="M16 10L19 13" fill="none" />
                                <path d="M19 10L16 13" fill="none" />
                            </svg>}
                        </button>
                    </div>

                    <div className="flex flex-none items-center gap-4">
                        <button onClick={rewind10} type="button" className="group relative rounded-full focus:outline-none" aria-label="Rewind 10 seconds">
                            <div className="absolute -inset-4 -right-2 md:hidden" />

                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 stroke-secondary-500 group-hover:stroke-secondary-700">
                                <path d="M8 5L5 8M5 8L8 11M5 8H13.5C16.5376 8 19 10.4624 19 13.5C19 15.4826 18.148 17.2202 17 18.188" />
                                <path d="M5 15V19" />
                                <path d="M8 18V16C8 15.4477 8.44772 15 9 15H10C10.5523 15 11 15.4477 11 16V18C11 18.5523 10.5523 19 10 19H9C8.44772 19 8 18.5523 8 18Z" />
                            </svg>
                        </button>

                        <div className="md:hidden">
                            <button type="button" onClick={active ? pause : play} className="group relative flex flex-shrink-0 items-center justify-center rounded-full bg-secondary-700 hover:bg-secondary-900 focus:outline-none focus:ring-secondary-700 h-10 w-10 focus:ring-2 focus:ring-offset-2" aria-label="Play">
                                <div className="absolute -inset-3 md:hidden" />

                                {!active ? <svg aria-hidden="true" viewBox="0 0 36 36" className="fill-white group-active:fill-white/80 h-5 w-5">
                                    <path d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z" />
                                </svg> : <svg aria-hidden="true" viewBox="0 0 22 28" className="fill-white group-active:fill-white/80 h-4 w-4">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.5 0C0.671573 0 0 0.671572 0 1.5V26.5C0 27.3284 0.671573 28 1.5 28H4.5C5.32843 28 6 27.3284 6 26.5V1.5C6 0.671573 5.32843 0 4.5 0H1.5ZM17.5 0C16.6716 0 16 0.671572 16 1.5V26.5C16 27.3284 16.6716 28 17.5 28H20.5C21.3284 28 22 27.3284 22 26.5V1.5C22 0.671573 21.3284 0 20.5 0H17.5Z" />
                                </svg>}
                            </button>
                        </div>

                        <button onClick={forward10} type="button" className="group relative rounded-full focus:outline-none" aria-label="Fast-forward 10 seconds">
                            <div className="absolute -inset-4 -left-2 md:hidden" />

                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6 stroke-secondary-500 group-hover:stroke-secondary-700"><path d="M16 5L19 8M19 8L16 11M19 8H10.5C7.46243 8 5 10.4624 5 13.5C5 15.4826 5.85204 17.2202 7 18.188" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13 15V19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 18V16C16 15.4477 16.4477 15 17 15H18C18.5523 15 19 15.4477 19 16V18C19 18.5523 18.5523 19 18 19H17C16.4477 19 16 18.5523 16 18Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <div role="group" id="react-aria66805060-1" aria-labelledby="react-aria66805060-2" className="absolute inset-x-0 bottom-full flex flex-auto touch-none items-center gap-6 md:relative">
                        <label className="sr-only" id="react-aria66805060-2">Current time</label>

                        <div className="relative w-full bg-secondary-100 md:rounded-full">
                            <div className="h-2 md:rounded-r-md md:rounded-l-xl bg-secondary-700 relative after:absolute after:h-full after:bg-secondary-100 after:w-[2px] after:right-0 after:top-0" style={{ width: `${slider}%` }} />

                            <input tabIndex={0} id="react-aria66805060-2-0" aria-labelledby="react-aria66805060-2" className='h-2 w-full absolute top-0 bg-transparent appearance-none cursor-pointer' type="range" min={0} max={length} step={.1} aria-orientation="horizontal" aria-valuetext={fmtMSS(time)} value={time} onChange={(e) => changeTime(+e.target.value)} />
                        </div>

                        <div className="hidden items-center gap-2 md:flex">
                            <output htmlFor="react-aria66805060-2-0" aria-live="off" className="hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 md:block text-secondary-900 dark:text-secondary-50">{!time ? fmtMSS(0) : fmtMSS(time)}</output>

                            <span className="text-sm leading-6 text-secondary-300" aria-hidden="true">/</span>

                            <span className="hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 text-secondary-900 dark:text-secondary-50 md:block">{!length ? fmtMSS(0) : fmtMSS(length)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <button type="button" onClick={speed} className="relative flex h-6 w-6 items-center justify-center rounded-md text-secondary-500 hover:bg-secondary-100 hover:text-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2" aria-label="Playback rate">
                                <div className="absolute -inset-4 md:hidden" />

                                {rate === 1 ? (
                                    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                        <path d="M13 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1Z" fill="currentColor" stroke="currentColor" strokeWidth="2" />
                                        <path d="M3.75 7.25L5.25 5.77539V11.25" />
                                        <path d="M8.75 7.75L11.25 10.25" />
                                        <path d="M11.25 7.75L8.75 10.25" />
                                    </svg>
                                ) : rate === 1.5 ? (
                                    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                        <path d="M13 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1Z" fill="currentColor" stroke="currentColor" strokeWidth="2" />
                                        <path d="M2.75 7.25L4.25 5.77539V11.25" />
                                        <path d="M7.5 11C7.5 11.2761 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.2761 6.5 11C6.5 10.7239 6.72386 10.5 7 10.5C7.27614 10.5 7.5 10.7239 7.5 11Z" strokeWidth="1" />
                                        <path d="M12.25 5.75H9.75V8.25H10.75C11.5784 8.25 12.25 8.92157 12.25 9.75V9.75C12.25 10.5784 11.5784 11.25 10.75 11.25H9.75" />
                                    </svg>
                                ) : (
                                    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                        <path d="M13 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1Z" fill="currentColor" stroke="currentColor" strokeWidth="2" />
                                        <path d="M9.75 8.75L12.25 11.25" />
                                        <path d="M12.25 8.75L9.75 11.25" />
                                        <path d="M3.75 7.25C3.75 7.25 3.90144 5.75 5.63462 5.75C6.1633 5.75 6.5448 5.95936 6.81973 6.25035C7.67157 7.15197 6.97033 8.47328 6.0238 9.28942L3.75 11.25H7.25" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="hidden items-center md:flex">
                            <button type="button" onClick={volume > 0 ? mute : unmute} className="group relative rounded-md hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2 md:order-none" aria-label="Mute">
                                <div className="absolute -inset-4 md:hidden" />

                                {volume > 0 ? <svg aria-hidden="true" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 fill-secondary-500 stroke-secondary-500 group-hover:fill-secondary-700 group-hover:stroke-secondary-700">
                                    <path d="M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z" />
                                    <path d="M17 7C17 7 19 9 19 12C19 15 17 17 17 17" fill="none" />
                                    <path d="M15.5 10.5C15.5 10.5 16 10.9998 16 11.9999C16 13 15.5 13.5 15.5 13.5" fill="none" />
                                </svg> : <svg aria-hidden="true" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 fill-slate-500 stroke-slate-500 group-hover:fill-slate-700 group-hover:stroke-slate-700">
                                    <path d="M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z" />
                                    <path d="M16 10L19 13" fill="none" />
                                    <path d="M19 10L16 13" fill="none" />
                                </svg>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}