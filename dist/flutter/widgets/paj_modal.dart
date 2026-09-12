// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajModal — modal dialog (sm/md/lg) with title, body and footer actions.
/// Backdrop tap / Esc / close button dismiss it; buttons align left and wrap
/// on narrow screens.
Future<T?> showPajModal<T>(
  BuildContext context, {
  required String title,
  String size = 'md',
  String? primaryText,
  VoidCallback? onPrimary,
  String? secondaryText,
  VoidCallback? onSecondary,
  required Widget child,
}) {
  return showDialog<T>(
    context: context,
    barrierDismissible: true,
    barrierColor: Pajamas.shared.coloralphadark40,
    builder: (BuildContext context) => PajModal<T>(
      title: title,
      size: size,
      primaryText: primaryText,
      onPrimary: onPrimary,
      secondaryText: secondaryText,
      onSecondary: onSecondary,
      child: child,
    ),
  );
}

class PajModal<T> extends StatelessWidget {
  const PajModal({
    super.key,
    required this.title,
    this.size = 'md',
    this.primaryText,
    this.onPrimary,
    this.secondaryText,
    this.onSecondary,
    required this.child,
  });

  final String title;
  final String size; // 'sm' | 'md' | 'lg'
  final String? primaryText;
  final VoidCallback? onPrimary;
  final String? secondaryText;
  final VoidCallback? onSecondary;
  final Widget child;

  double get _maxWidth => switch (size) {
        'sm' => 320,
        'lg' => 768,
        _ => 384,
      };

  Widget _action(BuildContext context, String text, Color bg, Color fg, VoidCallback? onTap) {
    return Material(
      color: bg,
      borderRadius: BorderRadius.circular(Pajamas.radiusLg),
      child: InkWell(
        borderRadius: BorderRadius.circular(Pajamas.radiusLg),
        onTap: () {
          onTap?.call();
          Navigator.of(context).pop();
        },
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: Pajamas.spacingScale3, vertical: Pajamas.spacingScale2),
          child: Text(text, style: TextStyle(fontSize: Pajamas.fontSizeBase, fontWeight: FontWeight.w600, color: fg)),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: _maxWidth),
        child: Container(
          decoration: BoxDecoration(
            color: Pajamas.shared.backgroundcolordefault,
            borderRadius: BorderRadius.circular(Pajamas.radiusLg),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Padding(
                padding: EdgeInsets.fromLTRB(Pajamas.spacingScale5, Pajamas.spacingScale5, Pajamas.spacingScale3, 0),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        title,
                        style: TextStyle(
                          fontSize: Pajamas.fontSizeLg,
                          fontWeight: FontWeight.w600,
                          color: Pajamas.shared.textcolorstrong,
                        ),
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, size: 16),
                      color: Pajamas.shared.textcolorsubtle,
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                  ],
                ),
              ),
              Flexible(
                child: SingleChildScrollView(
                  padding: EdgeInsets.all(Pajamas.spacingScale5),
                  child: DefaultTextStyle.merge(
                    style: TextStyle(fontSize: Pajamas.fontSizeBase, color: Pajamas.shared.textcolordefault),
                    child: child,
                  ),
                ),
              ),
              if (primaryText != null || secondaryText != null)
                Container(
                  decoration: BoxDecoration(
                    border: Border(top: BorderSide(color: Pajamas.shared.bordercolordefault)),
                  ),
                  padding: EdgeInsets.all(Pajamas.spacingScale5),
                  child: Wrap(
                    alignment: WrapAlignment.start,
                    spacing: Pajamas.spacingScale2,
                    runSpacing: Pajamas.spacingScale2,
                    children: [
                      if (secondaryText != null)
                        _action(
                          context,
                          secondaryText!,
                          Pajamas.shared.buttondefaultprimarybackgroundcolordefault,
                          Pajamas.shared.buttondefaultprimaryforegroundcolordefault,
                          onSecondary,
                        ),
                      if (primaryText != null)
                        _action(
                          context,
                          primaryText!,
                          Pajamas.shared.buttonconfirmprimarybackgroundcolordefault,
                          Pajamas.shared.buttonconfirmprimaryforegroundcolordefault,
                          onPrimary,
                        ),
                    ],
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
