function debounce(fn: Function, limit: number) {
    let timer: NodeJS.Timeout = null;

    return function() {
        if(timer) clearTimeout(timer);
        const args = Array.from(arguments);

        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, limit);
    }
}

function throttle_setTimeout(fn: Function, limit: number) {
    let timer: NodeJS.Timeout = null;

    return function() {
        const args = Array.from(arguments);

        if (!timer) {
            timer = setTimeout(() => {
                fn(...args);
                timer = null;
            })
        }
    }
}


function throttle_timestamp(fn: Function, limit: number) {
    let pre: number = null;

    return function() {
        const now: number = new Date().getTime();
        const args = Array.from(arguments);

        if(!pre || now - pre > limit) {
            fn(...args);
            pre = now;
        }
    }
}