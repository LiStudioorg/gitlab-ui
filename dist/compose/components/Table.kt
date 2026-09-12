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
fun GlTable(headers: List<String>,
    rows: List<List<String>>) {
    Column {
        Row {
            headers.forEach { h ->
                Box(Modifier.weight(1f).padding(8.dp)) {
                    Text(h, fontWeight = FontWeight.Bold, color = GlTextColorStrong, fontSize = 12.sp)
                }
            }
        }
        rows.forEach { r ->
            Row {
                r.forEach { cell ->
                    Box(Modifier.weight(1f).padding(8.dp)) {
                        Text(cell, color = GlTextColorDefault, fontSize = 12.sp)
                    }
                }
            }
        }
    }
}
