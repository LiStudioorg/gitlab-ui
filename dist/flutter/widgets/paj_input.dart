// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajInput — text field with validation state (valid/invalid), disabled and
/// readonly modes, width presets and a 2px focus ring.
class PajInput extends StatefulWidget {
  const PajInput({
    super.key,
    this.type = 'text',
    this.placeholder = '',
    this.state,
    this.disabled = false,
    this.readonly = false,
    this.width,
    this.onChanged,
  });

  final String type; // text/email/number/password/search/url/tel/date/time
  final String placeholder;
  final String? state; // 'valid' | 'invalid' | null
  final bool disabled;
  final bool readonly;
  final String? width; // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null
  final ValueChanged<String>? onChanged;

  @override
  State<PajInput> createState() => _PajInputState();
}

class _PajInputState extends State<PajInput> {
  static const Map<String, double> _widths = <String, double>{
    'xs': 192, 'sm': 256, 'md': 384, 'lg': 512, 'xl': double.infinity,
  };

  bool _focused = false;
  final TextEditingController _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  bool get _passive => widget.disabled || widget.readonly;

  Color _border() {
    if (_passive) return Pajamas.shared.controlbordercolordisabled;
    if (widget.state == 'invalid') return Pajamas.shared.controlbordercolorerror;
    if (widget.state == 'valid') return Pajamas.shared.controltextcolorvalid;
    if (_focused) return Pajamas.shared.controlbordercolorfocus;
    return Pajamas.shared.controlbordercolordefault;
  }

  @override
  Widget build(BuildContext context) {
    return Focus(
      onFocusChange: (v) => setState(() => _focused = v),
      child: Container(
        constraints: BoxConstraints(
          maxWidth: _widths[widget.width] ?? double.infinity,
        ),
        decoration: BoxDecoration(
          color: _passive
              ? Pajamas.shared.controlbackgroundcolordisabled
              : Pajamas.shared.controlbackgroundcolordefault,
          borderRadius: BorderRadius.circular(Pajamas.radiusLg),
          border: Border.all(color: _border(), width: Pajamas.borderWidth1),
          boxShadow: _focused
              ? [BoxShadow(color: Pajamas.shared.focusringoutercolor, blurRadius: 0, spreadRadius: 2)]
              : null,
        ),
        child: TextField(
          controller: _controller,
          enabled: !widget.disabled,
          readOnly: widget.readonly,
          obscureText: widget.type == 'password',
          onChanged: widget.onChanged,
          style: TextStyle(fontSize: Pajamas.fontSizeBase, color: Pajamas.shared.textcolordefault),
          decoration: InputDecoration(
            border: InputBorder.none,
            isCollapsed: true,
            contentPadding: EdgeInsets.symmetric(
              horizontal: Pajamas.spacingScale3,
              vertical: Pajamas.spacingScale2,
            ),
            hintText: widget.placeholder,
            hintStyle: TextStyle(fontSize: Pajamas.fontSizeBase, color: Pajamas.shared.controlplaceholdercolor),
          ),
        ),
      ),
    );
  }
}
