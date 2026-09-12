// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajButton — visual category (primary/secondary/tertiary) x semantic variant
/// (default/confirm/danger/link), with disabled, loading and block states.
class PajButton extends StatefulWidget {
  const PajButton({
    super.key,
    this.category = 'primary',
    this.variant = 'default',
    this.size = 'medium',
    this.disabled = false,
    this.loading = false,
    this.block = false,
    this.icon,
    this.onPressed,
    required this.child,
  });

  final String category; // 'primary' | 'secondary' | 'tertiary'
  final String variant; // 'default' | 'confirm' | 'danger' | 'link'
  final String size; // 'small' | 'medium'
  final bool disabled;
  final bool loading;
  final bool block;
  final IconData? icon;
  final VoidCallback? onPressed;
  final Widget child;

  @override
  State<PajButton> createState() => _PajButtonState();
}

class _PajButtonState extends State<PajButton> {
  static const List<String> _ok = <String>[
    'default-primary',
    'default-tertiary',
    'confirm-primary',
    'confirm-secondary',
    'confirm-tertiary',
    'danger-primary',
    'danger-secondary',
    'danger-tertiary',
  ];

  bool _hovered = false;
  bool _focused = false;

  bool get _enabled => !widget.disabled && !widget.loading;
  bool get _isLink => widget.variant == 'link';

  String get _combo {
    final key = '${widget.variant}-${widget.category}';
    return _ok.contains(key) ? key : 'default-primary';
  }

  Color _color(String part, String state) {
    if (_isLink && part == 'background') return Colors.transparent;
    if (_isLink && part == 'border') return Colors.transparent;
    if (_isLink && part == 'foreground') {
      return Pajamas.shared.buttonlinktextcolordefault;
    }
    if (!_enabled) {
      return switch (part) {
        'background' => Pajamas.shared.actiondisabledbackgroundcolor,
        'border' => Pajamas.shared.actiondisabledbordercolor,
        _ => Pajamas.shared.actiondisabledforegroundcolor,
      };
    }
    final actual = _hovered && state == 'default' ? 'hover' : state;
    return _token(part, actual);
  }

  Color _token(String part, String state) {
    final Pajamas p = Pajamas.shared;
    switch ('${_combo}-${part}-${state}') {
      case 'default-primary-background-default':
        return p.buttondefaultprimarybackgroundcolordefault;
      case 'default-primary-background-hover':
        return p.buttondefaultprimarybackgroundcolorhover;
      case 'default-primary-background-active':
        return p.buttondefaultprimarybackgroundcoloractive;
      case 'default-primary-foreground-default':
        return p.buttondefaultprimaryforegroundcolordefault;
      case 'default-primary-foreground-hover':
        return p.buttondefaultprimaryforegroundcolorhover;
      case 'default-primary-foreground-active':
        return p.buttondefaultprimaryforegroundcoloractive;
      case 'default-primary-border-default':
        return p.buttondefaultprimarybordercolordefault;
      case 'default-primary-border-hover':
        return p.buttondefaultprimarybordercolorhover;
      case 'default-primary-border-active':
        return p.buttondefaultprimarybordercoloractive;
      case 'default-tertiary-background-default':
        return p.buttondefaulttertiarybackgroundcolordefault;
      case 'default-tertiary-background-hover':
        return p.buttondefaulttertiarybackgroundcolorhover;
      case 'default-tertiary-background-active':
        return p.buttondefaulttertiarybackgroundcoloractive;
      case 'default-tertiary-foreground-default':
        return p.buttondefaulttertiaryforegroundcolordefault;
      case 'default-tertiary-foreground-hover':
        return p.buttondefaulttertiaryforegroundcolorhover;
      case 'default-tertiary-foreground-active':
        return p.buttondefaulttertiaryforegroundcoloractive;
      case 'default-tertiary-border-default':
        return p.buttondefaulttertiarybordercolordefault;
      case 'default-tertiary-border-hover':
        return p.buttondefaulttertiarybordercolorhover;
      case 'default-tertiary-border-active':
        return p.buttondefaulttertiarybordercoloractive;
      case 'confirm-primary-background-default':
        return p.buttonconfirmprimarybackgroundcolordefault;
      case 'confirm-primary-background-hover':
        return p.buttonconfirmprimarybackgroundcolorhover;
      case 'confirm-primary-background-active':
        return p.buttonconfirmprimarybackgroundcoloractive;
      case 'confirm-primary-foreground-default':
        return p.buttonconfirmprimaryforegroundcolordefault;
      case 'confirm-primary-foreground-hover':
        return p.buttonconfirmprimaryforegroundcolorhover;
      case 'confirm-primary-foreground-active':
        return p.buttonconfirmprimaryforegroundcoloractive;
      case 'confirm-primary-border-default':
        return p.buttonconfirmprimarybordercolordefault;
      case 'confirm-primary-border-hover':
        return p.buttonconfirmprimarybordercolorhover;
      case 'confirm-primary-border-active':
        return p.buttonconfirmprimarybordercoloractive;
      case 'confirm-secondary-background-default':
        return p.buttonconfirmsecondarybackgroundcolordefault;
      case 'confirm-secondary-background-hover':
        return p.buttonconfirmsecondarybackgroundcolorhover;
      case 'confirm-secondary-background-active':
        return p.buttonconfirmsecondarybackgroundcoloractive;
      case 'confirm-secondary-foreground-default':
        return p.buttonconfirmsecondaryforegroundcolordefault;
      case 'confirm-secondary-foreground-hover':
        return p.buttonconfirmsecondaryforegroundcolorhover;
      case 'confirm-secondary-foreground-active':
        return p.buttonconfirmsecondaryforegroundcoloractive;
      case 'confirm-secondary-border-default':
        return p.buttonconfirmsecondarybordercolordefault;
      case 'confirm-secondary-border-hover':
        return p.buttonconfirmsecondarybordercolorhover;
      case 'confirm-secondary-border-active':
        return p.buttonconfirmsecondarybordercoloractive;
      case 'confirm-tertiary-background-default':
        return p.buttonconfirmtertiarybackgroundcolordefault;
      case 'confirm-tertiary-background-hover':
        return p.buttonconfirmtertiarybackgroundcolorhover;
      case 'confirm-tertiary-background-active':
        return p.buttonconfirmtertiarybackgroundcoloractive;
      case 'confirm-tertiary-foreground-default':
        return p.buttonconfirmtertiaryforegroundcolordefault;
      case 'confirm-tertiary-foreground-hover':
        return p.buttonconfirmtertiaryforegroundcolorhover;
      case 'confirm-tertiary-foreground-active':
        return p.buttonconfirmtertiaryforegroundcoloractive;
      case 'confirm-tertiary-border-default':
        return p.buttonconfirmtertiarybordercolordefault;
      case 'confirm-tertiary-border-hover':
        return p.buttonconfirmtertiarybordercolorhover;
      case 'confirm-tertiary-border-active':
        return p.buttonconfirmtertiarybordercoloractive;
      case 'danger-primary-background-default':
        return p.buttondangerprimarybackgroundcolordefault;
      case 'danger-primary-background-hover':
        return p.buttondangerprimarybackgroundcolorhover;
      case 'danger-primary-background-active':
        return p.buttondangerprimarybackgroundcoloractive;
      case 'danger-primary-foreground-default':
        return p.buttondangerprimaryforegroundcolordefault;
      case 'danger-primary-foreground-hover':
        return p.buttondangerprimaryforegroundcolorhover;
      case 'danger-primary-foreground-active':
        return p.buttondangerprimaryforegroundcoloractive;
      case 'danger-primary-border-default':
        return p.buttondangerprimarybordercolordefault;
      case 'danger-primary-border-hover':
        return p.buttondangerprimarybordercolorhover;
      case 'danger-primary-border-active':
        return p.buttondangerprimarybordercoloractive;
      case 'danger-secondary-background-default':
        return p.buttondangersecondarybackgroundcolordefault;
      case 'danger-secondary-background-hover':
        return p.buttondangersecondarybackgroundcolorhover;
      case 'danger-secondary-background-active':
        return p.buttondangersecondarybackgroundcoloractive;
      case 'danger-secondary-foreground-default':
        return p.buttondangersecondaryforegroundcolordefault;
      case 'danger-secondary-foreground-hover':
        return p.buttondangersecondaryforegroundcolorhover;
      case 'danger-secondary-foreground-active':
        return p.buttondangersecondaryforegroundcoloractive;
      case 'danger-secondary-border-default':
        return p.buttondangersecondarybordercolordefault;
      case 'danger-secondary-border-hover':
        return p.buttondangersecondarybordercolorhover;
      case 'danger-secondary-border-active':
        return p.buttondangersecondarybordercoloractive;
      case 'danger-tertiary-background-default':
        return p.buttondangertertiarybackgroundcolordefault;
      case 'danger-tertiary-background-hover':
        return p.buttondangertertiarybackgroundcolorhover;
      case 'danger-tertiary-background-active':
        return p.buttondangertertiarybackgroundcoloractive;
      case 'danger-tertiary-foreground-default':
        return p.buttondangertertiaryforegroundcolordefault;
      case 'danger-tertiary-foreground-hover':
        return p.buttondangertertiaryforegroundcolorhover;
      case 'danger-tertiary-foreground-active':
        return p.buttondangertertiaryforegroundcoloractive;
      case 'danger-tertiary-border-default':
        return p.buttondangertertiarybordercolordefault;
      case 'danger-tertiary-border-hover':
        return p.buttondangertertiarybordercolorhover;
      case 'danger-tertiary-border-active':
        return p.buttondangertertiarybordercoloractive;
      default:
        return p.buttondefaultprimaryforegroundcolordefault;
    }
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: _enabled ? SystemMouseCursors.click : SystemMouseCursors.basic,
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: Focus(
        onFocusChange: (v) => setState(() => _focused = v),
        child: GestureDetector(
          onTap: _enabled ? widget.onPressed : null,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            width: widget.block ? double.infinity : null,
            padding: EdgeInsets.symmetric(
              horizontal: Pajamas.spacingScale3,
              vertical: widget.size == 'small' ? Pajamas.spacingScale1 : Pajamas.spacingScale2,
            ),
            decoration: BoxDecoration(
              color: _token('background', 'default'),
              borderRadius: BorderRadius.circular(Pajamas.radiusLg),
              border: Border.all(color: _token('border', 'default'), width: Pajamas.borderWidth1),
              boxShadow: _focused
                  ? [BoxShadow(color: Pajamas.shared.focusringoutercolor, blurRadius: 0, spreadRadius: 2)]
                  : null,
            ),
            alignment: Alignment.center,
            child: Row(
              mainAxisSize: widget.block ? MainAxisSize.max : MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (widget.loading) ...[
                  SizedBox(
                    width: 12,
                    height: 12,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(_token('foreground', 'default')),
                    ),
                  ),
                  const SizedBox(width: Pajamas.spacingScale2),
                ] else if (widget.icon != null) ...[
                  Icon(widget.icon, size: 16, color: _token('foreground', 'default')),
                  const SizedBox(width: Pajamas.spacingScale2),
                ],
                Flexible(
                  child: DefaultTextStyle.merge(
                    style: TextStyle(
                      fontSize: widget.size == 'small' ? Pajamas.fontSizeSm : Pajamas.fontSizeBase,
                      fontWeight: FontWeight.w600,
                      color: _token('foreground', 'default'),
                    ),
                    child: widget.child,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
