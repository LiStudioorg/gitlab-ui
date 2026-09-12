// Pajamas-inspired (MIT)
import 'package:flutter/material.dart';

import '../tokens.dart';

/// Column definition for PajTable.
class PajField {
  const PajField({required this.key, required this.label, this.sortable = false});
  final String key;
  final String label;
  final bool sortable;
}

/// PajTable — data table with sortable headers, busy state, row hover
/// highlight and an empty state.
class PajTable extends StatefulWidget {
  const PajTable({
    super.key,
    required this.fields,
    required this.items,
    this.loading = false,
    this.initialSortBy,
    this.initialSortDesc = false,
    this.onSort,
  });

  final List<PajField> fields;
  final List<Map<String, dynamic>> items;
  final bool loading;
  final String? initialSortBy;
  final bool initialSortDesc;
  final void Function(String? sortBy, bool sortDesc)? onSort;

  @override
  State<PajTable> createState() => _PajTableState();
}

class _PajTableState extends State<PajTable> {
  late String? _sortBy = widget.initialSortBy;
  late bool _sortDesc = widget.initialSortDesc;
  int _hovered = -1;

  void _sort(PajField field) {
    if (!field.sortable || widget.loading) return;
    setState(() {
      if (_sortBy == field.key) {
        _sortDesc = !_sortDesc;
      } else {
        _sortBy = field.key;
        _sortDesc = false;
      }
    });
    widget.onSort?.call(_sortBy, _sortDesc);
  }

  List<Map<String, dynamic>> get _sorted {
    if (_sortBy == null) return widget.items;
    final key = _sortBy!;
    final dir = _sortDesc ? -1 : 1;
    final rows = [...widget.items];
    rows.sort((a, b) {
      final av = (a[key] ?? '').toString().toLowerCase();
      final bv = (b[key] ?? '').toString().toLowerCase();
      return av.compareTo(bv) * dir;
    });
    return rows;
  }

  @override
  Widget build(BuildContext context) {
    final rows = _sorted;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          decoration: BoxDecoration(
            border: Border(bottom: BorderSide(color: Pajamas.shared.bordercolordefault)),
          ),
          padding: EdgeInsets.symmetric(horizontal: Pajamas.spacingScale3),
          child: Row(
            children: widget.fields.map((f) {
              final active = f.sortable && f.key == _sortBy;
              return Expanded(
                child: InkWell(
                  onTap: () => _sort(f),
                  child: Padding(
                    padding: EdgeInsets.symmetric(vertical: Pajamas.spacingScale3),
                    child: Row(
                      children: [
                        Text(
                          f.label,
                          style: TextStyle(
                            fontSize: Pajamas.fontSizeBase,
                            fontWeight: FontWeight.w600,
                            color: Pajamas.shared.textcolorstrong,
                          ),
                        ),
                        if (active)
                          Text(
                            _sortDesc ? '↓' : '↑',
                            style: TextStyle(
                              fontSize: Pajamas.fontSizeBase,
                              fontWeight: FontWeight.w700,
                              color: Pajamas.shared.tablesortingiconcolor,
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ),
        if (widget.loading)
          Padding(
            padding: EdgeInsets.all(Pajamas.spacingScale4),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(
                  width: 14,
                  height: 14,
                  child: CircularProgressIndicator(strokeWidth: 2),
                ),
                const SizedBox(width: Pajamas.spacingScale2),
                Text('Loading…', style: TextStyle(fontSize: Pajamas.fontSizeBase, color: Pajamas.shared.textcolorsubtle)),
              ],
            ),
          )
        else if (rows.isEmpty)
          Padding(
            padding: EdgeInsets.all(Pajamas.spacingScale6),
            child: Text('No items.', textAlign: TextAlign.center, style: TextStyle(fontSize: Pajamas.fontSizeBase, color: Pajamas.shared.textcolorsubtle)),
          )
        else
          for (var i = 0; i < rows.length; i++)
            MouseRegion(
              onEnter: (_) => setState(() => _hovered = i),
              onExit: (_) => setState(() => _hovered = -1),
              child: Container(
                color: _hovered == i ? Pajamas.shared.tablerowbackgroundcolorhover : Colors.transparent,
                padding: EdgeInsets.symmetric(horizontal: Pajamas.spacingScale3, vertical: Pajamas.spacingScale3),
                child: Row(
                  children: widget.fields
                      .map((f) => Expanded(
                            child: Text(
                              (rows[i][f.key] ?? '').toString(),
                              style: TextStyle(fontSize: Pajamas.fontSizeBase, color: Pajamas.shared.textcolordefault),
                            ),
                          ))
                      .toList(),
                ),
              ),
            ),
      ],
    );
  }
}
