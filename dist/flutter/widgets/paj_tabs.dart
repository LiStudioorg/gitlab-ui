// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// Single tab definition for PajTabs.
class PajTabItem {
  const PajTabItem({required this.title, this.count, this.content});
  final String title;
  final int? count;
  final String? content;
}

/// PajTabs — tab navigation with a bottom indicator on the active item and an
/// optional count badge.
class PajTabs extends StatefulWidget {
  const PajTabs({super.key, required this.tabs, this.initialActive = 0, this.onChange});
  final List<PajTabItem> tabs;
  final int initialActive;
  final ValueChanged<int>? onChange;

  @override
  State<PajTabs> createState() => _PajTabsState();
}

class _PajTabsState extends State<PajTabs> {
  int _active = 0;
  int _hovered = -1;

  @override
  void initState() {
    super.initState();
    if (widget.tabs.isNotEmpty) {
      _active = widget.initialActive.clamp(0, widget.tabs.length - 1);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          decoration: BoxDecoration(
            border: Border(bottom: BorderSide(color: Pajamas.shared.bordercolordefault)),
          ),
          child: Row(
            children: [
              for (var i = 0; i < widget.tabs.length; i++)
                MouseRegion(
                  onEnter: (_) => setState(() => _hovered = i),
                  onExit: (_) => setState(() => _hovered = -1),
                  child: InkWell(
                    onTap: () {
                      setState(() => _active = i);
                      widget.onChange?.call(i);
                    },
                    child: Container(
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: i == _active
                                ? Pajamas.shared.tabselectedindicatorcolordefault
                                : _hovered == i
                                    ? Pajamas.shared.bordercolorstrong
                                    : Colors.transparent,
                            width: 2,
                          ),
                        ),
                      ),
                      padding: EdgeInsets.symmetric(
                        horizontal: Pajamas.spacingScale4,
                        vertical: Pajamas.spacingScale4,
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            widget.tabs[i].title,
                            style: TextStyle(
                              fontSize: Pajamas.fontSizeBase,
                              fontWeight: i == _active ? FontWeight.w700 : FontWeight.w400,
                              color: i == _active ? Pajamas.shared.textcolorstrong : Pajamas.shared.textcolordefault,
                            ),
                          ),
                          if (widget.tabs[i].count != null) ...[
                            const SizedBox(width: Pajamas.spacingScale2),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: Pajamas.spacingScale2),
                              decoration: BoxDecoration(
                                color: Pajamas.shared.badgeneutralbackgroundcolordefault,
                                borderRadius: BorderRadius.circular(Pajamas.radiusFull),
                              ),
                              child: Text(
                                '${widget.tabs[i].count}',
                                style: TextStyle(fontSize: Pajamas.fontSizeSm, color: Pajamas.shared.badgeneutraltextcolordefault),
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
        if (widget.tabs.isNotEmpty && widget.tabs[_active].content != null)
          Padding(
            padding: EdgeInsets.symmetric(vertical: Pajamas.spacingScale4),
            child: Text(
              widget.tabs[_active].content!,
              style: TextStyle(fontSize: Pajamas.fontSizeBase, color: Pajamas.shared.textcolordefault),
            ),
          ),
      ],
    );
  }
}
