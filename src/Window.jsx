/**
 * Created by zhbhun on 2015/9/17.
 */
import React from 'react';
import classNames from 'classnames';
import assign from 'object-assign';
import {Portal, Transition} from 'react-overlays';
import Align from 'rc-align';
import {noop} from './utils';

// window id
let id = 1;

/**
 * 窗口组件
 */
export default class Window extends React.Component {

    static propTypes = {
        // 窗口前缀
        prefixCls: React.PropTypes.string,
        // 是否打开
        visible: React.PropTypes.bool,
        // 位置
        position: React.PropTypes.shape({
            align: React.PropTypes.oneOf(['tl', 'tc', 'tr', 'cl', 'cc', 'cr', 'bl', 'bc', 'br']),
            offset: React.PropTypes.arrayOf(React.PropTypes.number)
        }),
        // 大小
        size: React.PropTypes.shape({
            width: React.PropTypes.number,
            offset: React.PropTypes.number
        }),
        // 是否可以关闭
        closable: React.PropTypes.bool,
        // 是否可以最大化
        maximizable: React.PropTypes.bool,
        // 是否显示背景幕布
        backdrop: React.PropTypes.bool,
        // 是否启用快捷键
        keyboard: React.PropTypes.bool,
        // 是否有动画
        animation: React.PropTypes.oneOfType([
            React.PropTypes.func,
            React.PropTypes.bool
        ]),
        // 显示前回调函数
        onShow: React.PropTypes.func,
        // 定位后回调函数
        onAlign: React.PropTypes.func,
        // 显示后(动画结束)回调函数
        onShown: React.PropTypes.func,
        // 隐藏前回调函数
        onHide: React.PropTypes.func,
        // 隐藏后(动画结束)回调函数
        onHidden: React.PropTypes.func,
        close: React.PropTypes.element,
        restore: React.PropTypes.element,
        maximize: React.PropTypes.element
    }

    static defaultProps = {
        prefixCls: 'window',
        visible: false,
        position: {
            align: 'cc',
            offset: [0, 0]
        },
        closable: true,
        maximizable: true,
        backdrop: true,
        keyboard: true,
        animation: false,
        onShow: noop,
        onAlign: noop,
        onShown: noop,
        onHide: noop,
        onHidden: noop
    }

    constructor(props) {
        super(props);
        this.state = {
            // 窗口 id
            id: props.id ? props.id : ('window' + id++),
            // 动画进入状态
            animateEntered: false,
            /**
             * 动画退出状态
             * - 初始化(visible=false): 窗口未打开为 true
             * - 打开窗口(visible=true): 窗口打开为 false
             * - 关闭窗口(visible=false): 窗口关闭但动画未结束保持 false(需要动画结束事件处理)
             * - 动画结束: true
             */
            animateExited: !this.props.visible,
            // 是否最大化窗口
            maximize: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            this.setState({
                animateExited: false
            })
        }
    }

    componentWillUpdate() {
        if(this.state.animateExited) {
            this.setState({
                // 重置窗口的最大化状态
                maximize: false
            })
        }
    }

    render() {
        let props = this.props;
        let state = this.state;
        let {visible, animation, backdrop} = props;
        let {animateExited} = state;

        let shouldMount = visible || (animation && !animateExited);
        if (!shouldMount) {
            return null;
        }

        let window = this.renderWindow();
        if (backdrop) {
            window = this.renderBackdrop(window);
        }

        return (
            <Portal
                container={document.body}
                >
                {window}
            </Portal>
        );
    }


    /**
     * 渲染窗口背景布幕
     *
     * @param window
     * @returns {XML}
     */
    renderBackdrop(window) {
        let {prefixCls, visible, animation, closable} = this.props;
        let onClick = closable ? this.handleBackdropClick.bind(this) : null;

        let backdrop = (
            <Transition
                in={visible}
                timeout={50}
                className='window-fade'
                transitionAppear={true}
                enteredClassName='window-in'
                >
                <div
                    ref='backdrop'
                    className={classNames(`${prefixCls}-backdrop`)}
                    onClick={onClick}
                    />
            </Transition>
        );

        return (
            <div>
                {backdrop}
                {window}
            </div>
        );
    }

    /**
     * 渲染窗口
     * @returns {XML}
     */
    renderWindow() {
        let props = this.props;
        let {visible, className, prefixCls, animation, closable} = props;
        let {onExit, onExiting, onEnter, onEntering, onEntered} = props;
        let Animation = animation;
        animation = !!animation;

        let window = (
            <div
                {...props}
                id={this.state.id}
                className={classNames(prefixCls, className)}
                onClick={closable ? this.handleBackdropClick.bind(this) : null}
                >
                {this.renderWindowDialog()}
            </div>
        );

        if (animation) {
            window = (
                <Animation
                    in={visible}
                    onExit={onExit}
                    onExiting={onExiting}
                    onExited={this.handleAnimateExited.bind(this)}
                    onEnter={onEnter}
                    onEntering={onEntering}
                    onEntered={onEntered}>
                    {window}
                </Animation>
            );
        }

        return window;
    }

    /**
     * 渲染窗口对话框
     *
     * @returns {XML}
     */
    renderWindowDialog() {
        let {prefixCls, position, size} = this.props;
        position = {
            points: [position.align, position.align],
            offset: position.offset
        }
        if (this.state.maximize) {
            size = {
                width: '100%',
                height: '100%'
            }
        }

        return (
            <Align
                align={position}
                target={() => document.getElementById(this.state.id)}
                onAlign={() => this.handleAlign()}
                monitorWindowResize={true}
                >
                <div
                    className={classNames(`${prefixCls}-dialog`)}
                    style={size}
                    onClick={noop}
                    >
                    {this.renderWindowContent()}
                    {this.renderWindowOperation()}
                </div>
            </Align>
        );
    }

    /**
     * 渲染窗口操作按钮
     *
     * @returns {XML}
     */
    renderWindowOperation() {
        let {prefixCls, closable, maximizable} = this.props;
        let {close, restore, maximize} = this.props;
        let {maximize: max} = this.state;
        let operation = [];

        // 还原窗口
        if (maximizable && max) {
            operation.push(React.cloneElement(restore, {
                key: 'restore',
                className: classNames(`${prefixCls}-restore`),
                onClick: () => this.setState({maximize: false})
            }));
        }

        // 最大化窗口
        if (maximizable && !max) {
            operation.push(React.cloneElement(maximize, {
                key: 'maximize',
                className: classNames(`${prefixCls}-maximize`),
                onClick: () => this.setState({maximize: true})
            }));
        }

        // 关闭窗口
        if (closable) {
            operation.push(React.cloneElement(close, {
                key: 'close',
                className: classNames(`${prefixCls}-close`),
                onClick: this.handleClose.bind(this)
            }));
        }

        return (
            <div
                className={classNames(`${prefixCls}-operate`)}
                >
                {operation}
            </div>
        );
    }

    /**
     * 渲染窗口正文
     *
     * @returns {XML}
     */
    renderWindowContent() {
        let {prefixCls, children} = this.props;
        return (
            <div className={classNames(`${prefixCls}-content`)}>
                {children}
            </div>
        );
    }


    handleBackdropClick(e) {
        let {prefixCls} = this.props;
        let className = e.target.className.split(' ');
        if(className.indexOf(`${prefixCls}`) >=0 || className.indexOf(`${prefixCls}-backdrop`) >=0) {
            this.handleClose();
        }
    }

    handleAnimateExited(...args) {
        let props = this.props;
        this.setState({animateExited: true});

        if (props.onExited) {
            props.onExited(...args);
        }
    }

    handleAlign() {
        setTimeout(() => this.props.onAlign(), 0);
    }

    /**
     * 关闭窗口
     */
    handleClose() {
        let props = this.props;
        props.onHide();
    }
}
