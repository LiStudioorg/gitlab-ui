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
fun GlAlert(title: String,
    text: String,
    variant: String = "info") {
    val bg = when (variant) {
        "success" -> GlAlertSuccessBackgroundColor
        "warning" -> GlAlertWarningBackgroundColor
        "danger" -> GlAlertDangerBackgroundColor
        else -> GlAlertInfoBackgroundColor
    }
    Column(
        modifier = Modifier
            .background(bg, RoundedCornerShape(4.dp))
            .padding(12.dp),
    ) {
        Text(title, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = GlTextColorStrong)
        Spacer(Modifier.height(4.dp))
        Text(text, fontSize = 14.sp, color = GlTextColorDefault)
    }
}
