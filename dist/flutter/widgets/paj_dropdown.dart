// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// Item definition for PajDropdown.
class PajDropdownItem {
  const PajDropdownItem({
    required this.label,
    this.checked = false,
    this.disabled = false,
    this.header = false,
    this.divider = false,
  });
  final String label;
  final bool checked;
  final bool disabled;
  final bool header;
  final bool divider;
}

/// PajDropdown — trigger button with an anchored menu; supports headers,
/// checkable items, dividers and a clear-all entry.
class PajDropdown extends StatefulWidget {
  const PajDropdown({
    super.key,
    this.text = '',
    required this.items,
    this.showClearAll = false,
    this.disabled = false,
    this.onSelect,
    this.onClearAll,
  });

  final String text;
  final List<PajDropdownItem> items;
  final bool showClearAll;
  final bool disabled;
  final ValueChanged<PajDropdownItem>? onSelect;
  final VoidCallback? onClearAll;

  @override
  State<PajDropdown> createState() => _PajDropdownState();
}

class _PajDropdownState extends State<PajDropdown> {
  bool _open = false;
  int _hovered = -1;

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        InkWell(
          onTap: widget.disabled ? null : () => setState(() => _open = !_open),
          borderRadius: BorderRadius.circular(Pajamas.radiusLg),
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: Pajamas.spacingScale3, vertical: Pajamas.spacingScale2),
            decoration: BoxDecoration(
              color: widget.disabled ? Pajamas.shared.actiondisabledbackgroundcolor : Pajamas.shared.buttondefaultprimarybackgroundcolordefault,
              borderRadius: BorderRadius.circular(Pajamas.radiusLg),
              border: Border.all(color: Pajamas.shared.buttondefaultprimarybordercolordefault),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  widget.text,
                  style: TextStyle(
                    fontSize: Pajamas.fontSizeBase,
                    fontWeight: FontWeight.w600,
                    color: widget.disabled ? Pajamas.shared.actiondisabledforegroundcolor : Pajamas.shared.buttondefaultprimaryforegroundcolordefault,
                  ),
                ),
                const SizedBox(width: Pajamas.spacingScale2),
                Icon(
                  _open ? Icons.expand_less : Icons.expand_more,
                  size: 16,
                  color: Pajamas.shared.buttondefaultprimaryforegroundcolordefault,
                ),
              ],
            ),
          ),
        ),
        if (_open)
          Positioned(
            top: 44,
            left: 0,
            child: Material(
              color: Colors.transparent,
              child: Container(
                width: 208,
                decoration: BoxDecoration(
                  color: Pajamas.shared.dropdownbackgroundcolor,
                  borderRadius: BorderRadius.circular(Pajamas.radiusLg),
                  border: Border.all(color: Pajamas.shared.dropdownbordercolor),
                  boxShadow: [
                    BoxShadow(color: Pajamas.shared.coloralphadark16, blurRadius: 8, offset: const Offset(0, 2)),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(Pajamas.radiusLg),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      for (var i = 0; i < widget.items.length; i++)
                        _buildItem(i, widget.items[i]),
                      if (widget.showClearAll)
                        Container(
                          decoration: BoxDecoration(
                            border: Border(top: BorderSide(color: Pajamas.shared.dropdowndividercolor)),
                          ),
                          padding: const EdgeInsets.symmetric(
                            horizontal: Pajamas.spacingScale5,
                            vertical: Pajamas.spacingScale1,
                          ),
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: InkWell(
                              onTap: () {
                                setState(() => _open = false);
                                widget.onClearAll?.call();
                              },
                              child: Text(
                                'Clear all',
                                style: TextStyle(
                                  fontSize: Pajamas.fontSizeSm,
                                  decoration: TextDecoration.underline,
                                  color: Pajamas.shared.buttonlinktextcolordefault,
                                ),
                              ),
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildItem(int index, PajDropdownItem item) {
    if (item.divider) {
      return Container(height: 1, color: Pajamas.shared.dropdowndividercolor);
    }
    if (item.header) {
      return Padding(
        padding: EdgeInsets.fromLTRB(Pajamas.spacingScale5, Pajamas.spacingScale3, Pajamas.spacingScale5, Pajamas.spacingScale1),
        child: Text(
          item.label.toUpperCase(),
          style: TextStyle(fontSize: Pajamas.fontSizeSm, fontWeight: FontWeight.w700, color: Pajamas.shared.textcolorsubtle),
        ),
      );
    }
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = index),
      onExit: (_) => setState(() => _hovered = -1),
      child: InkWell(
        onTap: item.disabled
            ? null
            : () {
                setState(() => _open = false);
                widget.onSelect?.call(item);
              },
        child: Container(
          color: _hovered == index ? Pajamas.shared.dropdownoptionbackgroundcolorselectedhover : Colors.transparent,
          padding: EdgeInsets.symmetric(horizontal: Pajamas.spacingScale5, vertical: Pajamas.spacingScale3),
          child: Row(
            children: [
              Icon(
                Icons.check,
                size: 14,
                color: item.checked ? Pajamas.shared.dropdownoptionindicatorcolorselecteddefault : Colors.transparent,
              ),
              const SizedBox(width: Pajamas.spacingScale2),
              Expanded(
                child: Text(
                  item.label,
                  style: TextStyle(
                    fontSize: Pajamas.fontSizeBase,
                    color: item.disabled ? Pajamas.shared.dropdownoptiontextcolordisabled : Pajamas.shared.dropdownoptiontextcolordefault,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
