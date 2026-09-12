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
fun GlModal(title: String,
    onDismiss: () -> Unit = {},
    content: @Composable () -> Unit = {}) {
    androidx.compose.material3.AlertDialog(
        onDismissRequest = onDismiss,
        confirmButton = {},
        dismissButton = {},
        title = { Text(title, fontWeight = FontWeight.Bold) },
        text = { content() },
        containerColor = GlBackgroundColorDefault,
    )
}
