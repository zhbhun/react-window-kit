/**
 * Created by zhbhun on 2015/9/17.
 */
import React from 'react';
import classNames from 'classnames';
import {noop} from './utils';
import Animation from './Animation';
import WindowComponent from './Window';

export default class Modal extends React.Component {

    static propTypes = {
        // 是否打开
        visible: React.PropTypes.bool,
        size: React.PropTypes.oneOf(['fl', 'lg', 'md', 'sm']),
        header: React.PropTypes.node,
        footer: React.PropTypes.node,
        onHide: React.PropTypes.func
    }

    static defaultProps = {
        WindowComponent: WindowComponent,
        visible: false,
        size: 'md',
        onHide: noop
    }

    constructor(props) {
        super(props);
        this.state = {
            fixed: false // TODO 上层组件更新同步
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.visible && !this.props.visible) {
            this.setState({
                fixed: false
            });
        }
    }

    render() {
        let props = this.props;
        let state = this.state;
        let {WindowComponent, visible, size, onHide, header, children, footer} = props;
        let prefixCls = 'window-modal';

        let modal = [];
        if (header) {
            modal.push(
                <div
                    key='header'
                    ref='header'
                    className={classNames(`${prefixCls}-header`)}
                    >
                    <div className={classNames(`${prefixCls}-title`)}>
                        {header}
                    </div>
                </div>
            );
        }
        modal.push(
            <div
                key='body'
                ref='body'
                className={classNames(`${prefixCls}-body`)}
                >
                {this.state.fixed ? children : false}
            </div>
        );
        if (footer) {
            if(footer.map && footer.length > 0) {
                footer = footer.map(function(item, index) {
                    return React.cloneElement(item, {
                        onClick: () => this.handleOperation(item.key)
                    });
                }.bind(this))
            }
            modal.push(
                <div
                    key='footer'
                    ref='footer'
                    className={classNames(`${prefixCls}-footer`)}
                    >
                    {footer}
                </div>
            );
        }

        return (
            <WindowComponent
                className={classNames(prefixCls, `${prefixCls}-${size}`)}
                visible={visible}
                position={{align: 'cc', offset: [0, 0]}}
                closable={true}
                maximizable={true}
                backdrop={true}
                keyboard={true}
                animation={Animation.SlideDown}
                onAlign={() => this.handleAlign()}
                onHide={onHide}
                >
                {modal}
            </WindowComponent>
        )
    }

    handleAlign() {
        if(!this.state.fixed) {
            let {header, body, footer} = this.refs;
            body = React.findDOMNode(body);
            let headerAndFooterHeight = 0;
            if(header) {
                header = React.findDOMNode(header);
                headerAndFooterHeight += header.clientHeight;
            }
            if(footer) {
                footer = React.findDOMNode(footer);
                headerAndFooterHeight += footer.clientHeight;
            }
            let modal = body.parentNode;
            body.style.height = (modal.clientHeight - headerAndFooterHeight) + 'px';
            this.setState({
                fixed: true
            });
        }
    }

    handleOperation(key) {
        let props = this.props;
        let handler = props['on' + key];
        if(typeof handler == 'function') {
            handler();
        }
    }
}