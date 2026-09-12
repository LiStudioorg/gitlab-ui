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
fun GlForm(label: String,
    optional: Boolean = false,
    error: String? = null,
    field: @Composable () -> Unit = {}) {
    Column(Modifier.padding(bottom = 16.dp)) {
        Row {
            Text(label, fontWeight = FontWeight.Bold, color = GlTextColorStrong, fontSize = 14.sp)
            if (optional) {
                Spacer(Modifier.width(4.dp))
                Text("(optional)", color = GlTextColorSubtle, fontSize = 12.sp)
            }
        }
        Spacer(Modifier.height(4.dp))
        field()
        if (error != null) {
            Spacer(Modifier.height(4.dp))
            Text(error, color = GlControlTextColorError, fontSize = 12.sp)
        }
    }
}
