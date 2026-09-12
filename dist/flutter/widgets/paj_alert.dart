// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajAlert — inline alert banner. variant = info|success|warning|danger|tip;
/// supports a title, dismiss button and sticky (pinned) placement.
class PajAlert extends StatelessWidget {
  const PajAlert({
    super.key,
    this.variant = 'info',
    this.title,
    this.dismissible = true,
    this.sticky = false,
    this.onDismiss,
    required this.child,
  });

  final String variant; // info|success|warning|danger|tip
  final String? title;
  final bool dismissible;
  final bool sticky;
  final VoidCallback? onDismiss;
  final Widget child;

  String get _feedbackVariant => variant == 'tip' ? 'info' : variant;

  Color get _bg => switch (variant) {
        'success' => Pajamas.shared.alertsuccessbackgroundcolor,
        'warning' => Pajamas.shared.alertwarningbackgroundcolor,
        'danger' => Pajamas.shared.alertdangerbackgroundcolor,
        _ => Pajamas.shared.alertinfobackgroundcolor,
      };

  Color get _border => switch (variant) {
        'success' => Pajamas.shared.alertsuccessbordercolor,
        'warning' => Pajamas.shared.alertwarningbordercolor,
        'danger' => Pajamas.shared.alertdangerbordercolor,
        _ => Pajamas.shared.alertinfobordercolor,
      };

  Color get _titleColor => switch (variant) {
        'success' => Pajamas.shared.alertsuccesstitlecolor,
        'warning' => Pajamas.shared.alertwarningtitlecolor,
        'danger' => Pajamas.shared.alertdangertitlecolor,
        _ => Pajamas.shared.alertinfotitlecolor,
      };

  Color get _iconColor => switch (_feedbackVariant) {
        'success' => Pajamas.shared.feedbacksuccessiconcolor,
        'warning' => Pajamas.shared.feedbackwarningiconcolor,
        'danger' => Pajamas.shared.feedbackdangericoncolor,
        _ => Pajamas.shared.feedbackinfoiconcolor,
      };

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(Pajamas.spacingScale4),
      decoration: BoxDecoration(
        color: _bg,
        borderRadius: BorderRadius.circular(Pajamas.radiusLg),
        border: Border.all(color: _border),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 2),
            child: Icon(sticky ? Icons.push_pin_outlined : Icons.info_outline, size: 16, color: _iconColor),
          ),
          const SizedBox(width: Pajamas.spacingScale3),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (title != null)
                  Padding(
                    padding: const EdgeInsets.only(bottom: Pajamas.spacingScale1),
                    child: Text(
                      title!,
                      style: TextStyle(fontSize: Pajamas.fontSizeBase, fontWeight: FontWeight.w700, color: _titleColor),
                    ),
                  ),
                DefaultTextStyle.merge(
                  style: TextStyle(fontSize: Pajamas.fontSizeBase, color: Pajamas.shared.textcolordefault),
                  child: child,
                ),
              ],
            ),
          ),
          if (dismissible)
            InkWell(
              onTap: onDismiss,
              child: Padding(
                padding: const EdgeInsets.all(Pajamas.spacingScale1),
                child: Icon(Icons.close, size: 16, color: Pajamas.shared.textcolorsubtle),
              ),
            ),
        ],
      ),
    );
  }
}
