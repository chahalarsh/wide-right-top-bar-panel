// SPDX-License-Identifier: GPL-2.0-or-later
// Wide Right Panel - lets the right side of the GNOME Shell top bar grow
// past half the screen width so crowded indicators are not squished.

import Clutter from 'gi://Clutter';
import GObject from 'gi://GObject';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

// Runs after the panel allocates the right box and widens it to its
// natural width (growing toward the center) if the panel gave it less.
const GrowRightConstraint = GObject.registerClass(
class GrowRightConstraint extends Clutter.Constraint {
    vfunc_update_allocation(actor, allocation) {
        const parent = actor.get_parent();
        if (!parent)
            return;

        const [, natural] = actor.get_preferred_width(-1);
        const target = Math.min(natural, parent.get_width());

        if (allocation.get_width() >= target)
            return;

        if (actor.get_text_direction() === Clutter.TextDirection.RTL)
            allocation.x2 = allocation.x1 + target;
        else
            allocation.x1 = allocation.x2 - target;
    }
});

export default class WideRightPanel extends Extension {
    enable() {
        // Move the clock out of the center box so the widened right box
        // does not overlap it.
        const container = Main.panel.statusArea.dateMenu?.container;
        if (container) {
            container.get_parent()?.remove_child(container);
            Main.panel._leftBox.add_child(container);
            this._clockMoved = true;
        }

        this._constraint = new GrowRightConstraint();
        Main.panel._rightBox.add_constraint(this._constraint);
        Main.panel.queue_relayout();
    }

    disable() {
        if (this._constraint) {
            Main.panel._rightBox.remove_constraint(this._constraint);
            this._constraint = null;
        }

        if (this._clockMoved) {
            const container = Main.panel.statusArea.dateMenu?.container;
            if (container) {
                container.get_parent()?.remove_child(container);
                Main.panel._centerBox.add_child(container);
            }
            this._clockMoved = false;
        }

        Main.panel.queue_relayout();
    }
}
