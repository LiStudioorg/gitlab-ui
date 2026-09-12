// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// PajToast — bottom-left lightweight notification with auto-hide (5s by
/// default) and an optional action button.
void showPajToast(
  BuildContext context, {
  required String message,
  String? actionText,
  VoidCallback? onAction,
  Duration autoHideDelay = const Duration(seconds: 5),
}) {
  final OverlayEntry entry = OverlayEntry(
    builder: (BuildContext context) => _PajToastView(
      message: message,
      actionText: actionText,
      onAction: onAction,
      autoHideDelay: autoHideDelay,
      onDismiss: () => entry.remove(),
    ),
  );
  Overlay.of(context).insert(entry);
}

class _PajToastView extends StatefulWidget {
  const _PajToastView({
    required this.message,
    this.actionText,
    this.onAction,
    required this.autoHideDelay,
    required this.onDismiss,
  });

  final String message;
  final String? actionText;
  final VoidCallback? onAction;
  final Duration autoHideDelay;
  final VoidCallback onDismiss;

  @override
  State<_PajToastView> createState() => _PajToastViewState();
}

class _PajToastViewState extends State<_PajToastView> {
  bool _dismissed = false;

  void _close() {
    if (_dismissed) return;
    _dismissed = true;
    widget.onDismiss();
  }

  @override
  void initState() {
    super.initState();
    Future<void>.delayed(widget.autoHideDelay, _close);
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: Pajamas.spacingScale6,
      bottom: Pajamas.spacingScale6,
      child: Material(
        color: Colors.transparent,
        child: Container(
          padding: EdgeInsets.symmetric(
            horizontal: Pajamas.spacingScale5,
            vertical: Pajamas.spacingScale4,
          ),
          decoration: BoxDecoration(
            color: Pajamas.shared.feedbackstrongbackgroundcolor,
            borderRadius: BorderRadius.circular(Pajamas.radiusFull),
            boxShadow: [
              BoxShadow(color: Pajamas.shared.coloralphadark24, blurRadius: 12, offset: const Offset(0, 4)),
            ],
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Flexible(
                child: Text(
                  widget.message,
                  style: TextStyle(fontSize: Pajamas.fontSizeBase, color: Pajamas.shared.feedbackstrongtextcolor),
                ),
              ),
              if (widget.actionText != null) ...[
                const SizedBox(width: Pajamas.spacingScale4),
                InkWell(
                  onTap: () {
                    widget.onAction?.call();
                    _close();
                  },
                  child: Text(
                    widget.actionText!,
                    style: TextStyle(
                      fontSize: Pajamas.fontSizeBase,
                      fontWeight: FontWeight.w600,
                      decoration: TextDecoration.underline,
                      color: Pajamas.shared.feedbackstronglinkcolor,
                    ),
                  ),
                ),
              ],
              const SizedBox(width: Pajamas.spacingScale4),
              InkWell(
                onTap: _close,
                child: Icon(Icons.close, size: 14, color: Pajamas.shared.feedbackstronglinkcolor),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
