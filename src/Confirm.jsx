/**
 * Created by zhbhun on 2015/9/17.
 */

import React from 'react';
import classNames from 'classnames';
import {noop} from './utils.js';

export default class Confirm extends React.Component {

    static propTypes = {
        visible: React.PropTypes.bool,
        title: React.PropTypes.string,
        onCancel: React.PropTypes.func,
        onOk: React.PropTypes.func
    }

    static defaultProps = {
        Window: Window,
        sign: null,
        cancel: null,
        ok: null,

        visible: false,
        onCancel: noop,
        onOk: noop
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let props = this.props;
        let state = this.state;
        let {Window, sign, cancel, ok, visible, title, children, onCancel, onOk} = props;
        let prefixCls = 'window';

        return (
            <Window
                className={classNames(`${prefixCls}-confirm`)}
                visible={visible}
                position={{align: 'cc', offset: [0, 0]}}
                size={{width: 450}}
                closable={false}
                maximizable={false}
                backdrop={true}
                keyboard={false}
                animation={false}
                >
                <div className={`${prefixCls}-header`}>
                    {
                        sign ?
                            React.cloneElement(sign, {
                                className: classNames(
                                    `${prefixCls}-sign`,
                                    sign.props.className
                                )
                            }) :
                            null
                    }
                    {title}
                </div>
                <div className={`${prefixCls}-body`}>{children}</div>
                <div className={`${prefixCls}-footer`}>
                    {React.cloneElement(cancel, {onClick: onCancel})}
                    {React.cloneElement(ok, {onClick: onOk})}
                </div>
            </Window>
        )
    }
}