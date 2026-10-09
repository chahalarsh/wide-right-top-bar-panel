// SPDX-License-Identifier: GPL-2.0-or-later

import Adw from 'gi://Adw';
import Gio from 'gi://Gio';

import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class WideRightTopBarPanelPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const page = new Adw.PreferencesPage();
        window.add(page);

        const group = new Adw.PreferencesGroup();
        page.add(group);

        const row = new Adw.SwitchRow({
            title: 'Move the clock to the left side',
            subtitle: 'Prevents the widened right side from overlapping the clock. Turn this off to keep the clock centered.',
        });
        group.add(row);

        window._settings = this.getSettings();
        window._settings.bind('move-clock', row, 'active', Gio.SettingsBindFlags.DEFAULT);
    }
}
