/**
 * Created by zhbhun on 2015/9/17.
 */
import React from 'react';
import classNames from 'classnames';
import {noop} from './utils';

export default class Tip extends React.Component {

    static propTypes = {
        visible: React.PropTypes.bool,
        type: React.PropTypes.oneOf(['info', 'success', 'waining', 'danger']),
        title: React.PropTypes.string,
        onOk: React.PropTypes.func
    }

    static defaultProps = {
        Window: Window,
        sign: null,
        ok: null,

        visible: false,
        type: 'info',
        onOk: noop
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let props = this.props;
        let state = this.state;
        let {Window, sign, ok, visible, type, title, children, onOk} = props;
        sign = sign[type];
        let prefixCls = 'window';

        return (
            <Window
                className={classNames(`${prefixCls}-tip`)}
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
                    {React.cloneElement(sign, {className: `${prefixCls}-sign ${prefixCls}-sign-${type}`})}
                    {title}
                </div>
                <div className={`${prefixCls}-body`}>{children}</div>
                <div className={`${prefixCls}-footer`}>
                    {React.cloneElement(ok, {onClick: onOk})}
                </div>
            </Window>
        )
    }
}