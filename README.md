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
- Moves the clock from the center to the left side of the top bar so the
  widened right side does not overlap it.
- Restores everything when you disable the extension.

## Installation

### From extensions.gnome.org

Search for "Wide right top bar panel" on https://extensions.gnome.org and toggle it on.

### From source

```bash
git clone https://github.com/chahalarsh/wide-right-top-bar-panel
cd wide-right-panel
./package.sh
gnome-extensions install --force wide-right-top-bar-panell@chahalarsh.github.io.shell-extension.zip
```

Then restart GNOME Shell so it discovers the extension: log out and back in
on Wayland, or press `Alt+F2`, type `r`, and press Enter on X11. Enable it:

```bash
gnome-extensions enable wide-right-panel@chahalarsh.github.io
```

## Uninstall

```bash
gnome-extensions uninstall wide-right-panel@chahalarsh.github.io
```

## Troubleshooting

- **"Extension does not exist"**: GNOME only discovers new extensions at
  startup. Log out and back in, then run `gnome-extensions list`.
- **Icons are still squished**: the icons may exceed the whole panel width,
  or another extension (e.g. a tray extension) is shrinking them itself. Check
  that extension's icon-size or overflow settings.

