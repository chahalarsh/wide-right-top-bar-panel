# Wide right top bar Panel

A GNOME Shell extension that lets the **right side of the top bar grow beyond
half the screen**, so a crowd of status icons and tray indicators is no longer
squished or clipped.

## The problem

GNOME Shell keeps the top bar's center box (the clock) centered on the screen.
That means the right box can never be wider than half the screen minus half the
clock's width. With many indicators (AppIndicator tray icons, VPN, input
methods, monitors, ...) they get compressed or cut off.

## What it does

- Widens the right box to the width its icons actually need, growing toward the
  center.
- Optionally moves the clock from the center to the left side of the top bar so
  the widened right side does not overlap it (enabled by default).
- Restores everything when you disable the extension.

## Compatibility

GNOME Shell 48, 49 and 50 (see `shell-version` in `metadata.json`).

## Settings

Open the extension's settings from the Extensions app, or run:

```bash
gnome-extensions prefs wide-right-top-bar-panel@chahalarsh.github.io
```

| Option | Default | Description |
| --- | --- | --- |
| Move the clock to the left side | On | Moves the clock out of the center so the widened right side can't overlap it. Turn off to keep the clock centered; a very wide right side may then overlap it. |

Changes apply immediately.

## Installation

### From source

```bash
git clone https://github.com/chahalarsh/wide-right-top-bar-panel.git
cd wide-right-top-bar-panel
./package.sh
gnome-extensions install --force wide-right-top-bar-panel@chahalarsh.github.io.shell-extension.zip
```

### From a release zip

Download `wide-right-top-bar-panel@chahalarsh.github.io.shell-extension.zip` from the repository's Releases page and run:

```bash
gnome-extensions install --force wide-right-top-bar-panel@chahalarsh.github.io.shell-extension.zip
```

### Enable

GNOME Shell only discovers new extensions at startup, so log out and back in
(on Wayland this is the only way; GNOME 50 no longer has an X11 session). On an
X11 session (GNOME 48/49) you can instead press `Alt+F2`, type `r` and press
Enter. Then enable it:

```bash
gnome-extensions enable wide-right-top-bar-panel@chahalarsh.github.io
```

## Uninstall

```bash
gnome-extensions uninstall wide-right-top-bar-panel@chahalarsh.github.io
```

## Troubleshooting

- **"Extension does not exist"**: log out and back in, then run
  `gnome-extensions list`.
- **Icons are still squished**: the icons may exceed the whole panel width, or
  another extension (e.g. a tray extension) is shrinking them itself. Check that
  extension's icon-size or overflow settings.
- **The settings window does nothing**: if you copied the files by hand instead
  of using `gnome-extensions install`, compile the schema once:
  `glib-compile-schemas ~/.local/share/gnome-shell/extensions/wide-right-top-bar-panel@chahalarsh.github.io/schemas`
- **Check for errors**:
  ```bash
  journalctl -b -o cat /usr/bin/gnome-shell | grep -i -E "wide-right|error" | tail -30
  journalctl -f -o cat /usr/bin/gjs   # while the settings window is open
  ```

## How it works

A `Clutter.Constraint` is attached to the panel's right box. After the panel
allocates the right box, the constraint widens it toward the center up to its
natural width. The panel's own layout code is not patched.

## Known limitations

- With "Move the clock" on, the clock sits on the left side of the panel.
- With it off, a very wide right side can overlap the centered clock.
- Other extensions that move the clock or rearrange the panel boxes may conflict.

## Reporting issues

Please open an issue at https://github.com/chahalarsh/wide-right-top-bar-panel/issues
and include your GNOME Shell version (`gnome-shell --version`) and any log
output from the commands above.

## License

GPL-2.0-or-later. See [LICENSE](LICENSE).
