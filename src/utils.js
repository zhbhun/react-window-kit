/**
 * Created by zhbhun on 2015/9/23.
 */

export function noop(e) {
    if(e) {
        e.stopPropagation();
        e.preventDefault();
    }
}