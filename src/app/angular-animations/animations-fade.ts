import { animate, animation, keyframes, state, style, transition, trigger, useAnimation } from "@angular/animations";

// bounce effect animation reuseable function 
export let bounceOutLeftAnimation = animation(
    animate('0.5s ease-in', keyframes([
        style({
            offset: .2,
            opacity: 1,
            transform: 'translateX(20px)'
        }),
        style({
            offset: 1,
            opacity: 0,
            transform: 'translateX(-100%)'
        })
    ]))
)

// Side effect animation reuseable function 
export let slideEffect = animation(
    animate('0.7s ease-out', keyframes([
        style({ transform: 'translateX(-10px)', backgroundColor: '#ccdceb' }),
    ]))
)

// Fade in and fade out effect
export let fade = trigger('fade', [
    state('void', style({
        backgroundColor: '#ccdceb', opacity: 0
    })),
    transition('void <=> *', [
        animate(2000)
    ])
])

// Slide effect with bounce on delete
export let slideEffectWithBounce = trigger('slideEffectWithBounce', [
    transition(':enter', [
        style({ transform: 'translateX(-10px)', backgroundColor: '#ccdceb' }),
        animate('0.7s ease-out')
    ]),
    transition(':leave',
        useAnimation(bounceOutLeftAnimation))
])

// Zoom in effect on enter and bounce effect on delete
export let zoomEffect = trigger('zoomEffect', [
    transition(':enter', [
        animate(2000, keyframes([
            style({
                offset: .2,
                opacity: 0,
                transform: 'scale3d(0.3, 0.3, 0.3)'
            }),
            style({
                offset: .5,
                opacity: 1,
            })
        ]))
    ]),
    transition(':leave', [
        animate('0.5s ease-in', keyframes([
            style({
                offset: .2,
                opacity: 1,
                transform: 'translateX(20px)'
            }),
            style({
                offset: 1,
                opacity: 0,
                transform: 'translateX(-100%)'
            })
        ]))
    ])
])

//slidingEntrance animation

export let slidingEntrance = trigger('slidingEntrance', [
    transition(':enter', [
        animate(2000, keyframes([
            style({
                offset: .2,
                transform: 'translate3d(-100%, 0, 0) skewX(30deg)',
                opacity: 0,
            }),
            style({
                offset: .5,
                transform: 'translate3d(0, 0, 0)',
            })
        ]))
    ]),
    transition(':leave', [

    ])
])