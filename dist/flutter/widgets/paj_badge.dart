// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajBadge — pill status label. variant = neutral|info|success|warning|danger|tier.
class PajBadge extends StatelessWidget {
  const PajBadge({
    super.key,
    this.variant = 'neutral',
    this.icon,
    required this.label,
  });

  final String variant;
  final IconData? icon;
  final String label;

  Color get _bg => switch (variant) {
        'info' => Pajamas.shared.badgeinfobackgroundcolordefault,
        'success' => Pajamas.shared.badgesuccessbackgroundcolordefault,
        'warning' => Pajamas.shared.badgewarningbackgroundcolordefault,
        'danger' => Pajamas.shared.badgedangerbackgroundcolordefault,
        'tier' => Pajamas.shared.badgetierbackgroundcolordefault,
        _ => Pajamas.shared.badgeneutralbackgroundcolordefault,
      };

  Color get _fg => switch (variant) {
        'info' => Pajamas.shared.badgeinfotextcolordefault,
        'success' => Pajamas.shared.badgesuccesstextcolordefault,
        'warning' => Pajamas.shared.badgewarningtextcolordefault,
        'danger' => Pajamas.shared.badgedangertextcolordefault,
        'tier' => Pajamas.shared.badgetiertextcolordefault,
        _ => Pajamas.shared.badgeneutraltextcolordefault,
      };

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: Pajamas.spacingScale2),
      decoration: BoxDecoration(
        color: _bg,
        borderRadius: BorderRadius.circular(Pajamas.radiusFull),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 12, color: _fg),
            const SizedBox(width: Pajamas.spacingScale1),
          ],
          Padding(
            padding: const EdgeInsets.symmetric(vertical: Pajamas.spacingScale1),
            child: Text(
              label,
              style: TextStyle(fontSize: Pajamas.fontSizeSm, fontWeight: FontWeight.w600, color: _fg),
            ),
          ),
        ],
      ),
    );
  }
}
