// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajFormGroup — form field group: bold label + optional marker + helper
/// text + control slot + error feedback.
class PajFormGroup extends StatelessWidget {
  const PajFormGroup({
    super.key,
    this.label = '',
    this.helper = '',
    this.error,
    this.optional = false,
    required this.child,
  });

  final String label;
  final String helper;
  final String? error;
  final bool optional;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.baseline,
          textBaseline: TextBaseline.alphabetic,
          children: [
            Text(
              label,
              style: TextStyle(fontSize: Pajamas.fontSizeBase, fontWeight: FontWeight.w700, color: Pajamas.shared.textcolorstrong),
            ),
            if (optional)
              Padding(
                padding: const EdgeInsets.only(left: Pajamas.spacingScale2),
                child: Text(
                  '(optional)',
                  style: TextStyle(fontSize: Pajamas.fontSizeBase, color: Pajamas.shared.textcolorsubtle),
                ),
              ),
          ],
        ),
        if (helper.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: Pajamas.spacingScale1, bottom: Pajamas.spacingScale2),
            child: Text(
              helper,
              style: TextStyle(fontSize: Pajamas.fontSizeSm, color: Pajamas.shared.textcolorsubtle),
            ),
          )
        else
          const SizedBox(height: Pajamas.spacingScale2),
        child,
        if (error != null && error!.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: Pajamas.spacingScale2),
            child: Text(
              error!,
              style: TextStyle(fontSize: Pajamas.fontSizeSm, color: Pajamas.shared.controltextcolorerror),
            ),
          ),
      ],
    );
  }
}
