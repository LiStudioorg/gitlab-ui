package com.example.pajamas.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.pajamas.*
// Pajamas-inspired (MIT)


@Composable
fun GlDropdown(label: String,
    items: List<String>,
    expanded: Boolean = false,
    onExpandChange: (Boolean) -> Unit = {},
    onSelect: (String) -> Unit = {}) {
    androidx.compose.material3.ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = onExpandChange,
    ) {
        Text(label, Modifier.padding(8.dp))
        androidx.compose.material3.DropdownMenu(
            expanded = expanded,
            onDismissRequest = { onExpandChange(false) },
            containerColor = GlDropdownBackgroundColor,
        ) {
            items.forEach { item ->
                androidx.compose.material3.DropdownMenuItem(
                    text = { Text(item) },
                    onClick = { onSelect(item); onExpandChange(false) },
                )
            }
        }
    }
}
