// SPDX-License-Identifier: GPL-2.0-or-later

import Clutter from 'gi://Clutter';
import GObject from 'gi://GObject';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

// The panel never gives the right box more than the space left beside the
// centered clock. After the panel allocates the box, widen it toward the
// center up to its natural width.
const GrowRightConstraint = GObject.registerClass({
    GTypeName: 'WideRightTopBarPanelGrowRightConstraint',
}, class GrowRightConstraint extends Clutter.Constraint {
    vfunc_update_allocation(actor, allocation) {
        const [, natural] = actor.get_preferred_width(-1);
        const target = Math.min(natural, actor.get_parent().get_width());

        if (allocation.get_width() >= target)
            return;

        if (actor.get_text_direction() === Clutter.TextDirection.RTL)
            allocation.x2 = allocation.x1 + target;
        else
            allocation.x1 = allocation.x2 - target;
    }
});

export default class WideRightTopBarPanel extends Extension {
    enable() {
        this._clockMoved = false;

        this._settings = this.getSettings();
        this._settingsChangedId = this._settings.connect('changed::move-clock', () => this._syncClock());

        this._constraint = new GrowRightConstraint();
        Main.panel._rightBox.add_constraint(this._constraint);

        this._syncClock();
        Main.panel.queue_relayout();
    }

    disable() {
        this._settings.disconnect(this._settingsChangedId);
        this._settingsChangedId = null;
        this._settings = null;

        Main.panel._rightBox.remove_constraint(this._constraint);
        this._constraint = null;

        this._restoreClock();
        Main.panel.queue_relayout();
    }

    _syncClock() {
        if (this._settings.get_boolean('move-clock'))
            this._moveClock();
        else
            this._restoreClock();
    }

    _moveClock() {
        if (this._clockMoved)
            return;

        const container = Main.panel.statusArea.dateMenu.container;
        container.get_parent().remove_child(container);
        Main.panel._leftBox.add_child(container);
        this._clockMoved = true;
        Main.panel.queue_relayout();
    }

    _restoreClock() {
        if (!this._clockMoved)
            return;

        const container = Main.panel.statusArea.dateMenu.container;
        container.get_parent().remove_child(container);
        Main.panel._centerBox.add_child(container);
        this._clockMoved = false;
        Main.panel.queue_relayout();
    }
}
