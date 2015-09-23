/**
 * Created by zhbhun on 2015/9/22.
 */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import assign from 'object-assign';
var RB = require('react-bootstrap');
import {Window, Modal, Confirm, Tip} from 'react-window-kit';

class BootstrapWindow extends Window {
    static defaultProps = assign({}, Window.defaultProps, {
        close: <RB.Glyphicon {...this.props} glyph="remove" />,
        restore: <RB.Glyphicon {...this.props} glyph="resize-small" />,
        maximize: <RB.Glyphicon {...this.props} glyph="resize-full" />
    });
}

class BootstrapModal extends Modal {
    static defaultProps = assign({}, Modal.defaultProps, {
        Window: BootstrapWindow,
        footer: [
            <RB.Button
                key='Cancel'
                bsStyle='default'
                >
                Cancel
            </RB.Button>,
            <RB.Button
                key='Confirm'
                bsStyle='primary'
                >
                Confirm
            </RB.Button>
        ]
    });
}

class BootstrapConfirm extends Confirm {
    static defaultProps = assign({}, Modal.defaultProps, {
        Window: BootstrapWindow,
        sign: <RB.Glyphicon glyph='question-sign'/>,
        cancel: <RB.Button bsStyle='default'>Cancel</RB.Button>,
        ok: <RB.Button bsStyle='primary'>OK</RB.Button>
    });
}

class BootstrapTip extends Tip {
    static defaultProps = assign({}, Modal.defaultProps, {
        Window: BootstrapWindow,
        sign: {
            info: <RB.Glyphicon glyph='info-sign'/>,
            success: <RB.Glyphicon glyph='ok-sign'/>,
            warning: <RB.Glyphicon glyph='exclamation-sign'/>,
            danger: <RB.Glyphicon glyph='remove-sign'/>
        },
        cancel: <RB.Button bsStyle='default'>Cancel</RB.Button>,
        ok: <RB.Button bsStyle='primary'>OK</RB.Button>
    });
}

export default {
    Window: BootstrapWindow,
    Modal: BootstrapModal,
    Confirm: BootstrapConfirm,
    Tip: BootstrapTip
};  