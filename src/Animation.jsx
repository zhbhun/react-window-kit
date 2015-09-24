/**
 * Created by zhbhun on 2015/9/17.
 */
import React from 'react';
import {Transition} from 'react-overlays';
import assign from 'object-assign';
import {noop} from './utils';

export default class Animation extends React.Component {

    static propTypes = {
        /**
         * Show the component; triggers the fade in or fade out animation
         */
        in: React.PropTypes.bool,
        /**
         * Callback fired before the component fades in
         */
        onEnter: React.PropTypes.func,
        /**
         * Callback fired after the component starts to fade in
         */
        onEntering: React.PropTypes.func,
        /**
         * Callback fired after the has component faded in
         */
        onEntered: React.PropTypes.func,
        /**
         * Callback fired before the component fades out
         */
        onExit: React.PropTypes.func,
        /**
         * Callback fired after the component starts to fade out
         */
        onExiting: React.PropTypes.func,
        /**
         * Callback fired after the component has faded out
         */
        onExited: React.PropTypes.func
    };

    defaultProps = {
        in: false,
        onEnter: noop,
        onEntering: noop,
        onEntered: noop,
        onExit: noop,
        onExiting: noop,
        onExited: noop
    };

    render() {
        let props = this.props;
        return <Transition {...this.props}>{this.props.children}</Transition>;
    }
}

class SlideDown extends Animation {

    static defaultProps = assign({}, Animation.defaultProps, {
        timeout: 150,
        className: 'window-slide-up',
        transitionAppear: true,
        enteredClassName: 'window-slide-down'
    })

    render() {
        return super.render();
    }
}

Animation.SlideDown = SlideDown;