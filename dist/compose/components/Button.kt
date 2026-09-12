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

import androidx.compose.foundation.clickable
@Composable
fun GlButton(label: String,
    variant: String = "confirm",
    category: String = "primary",
    size: String = "medium",
    enabled: Boolean = true,
    onClick: () -> Unit = {}) {
    val bg = when (variant + category) {
        "confirmprimary" -> GlButtonConfirmPrimaryBackgroundColorDefault
        "dangerprimary" -> GlButtonDangerPrimaryBackgroundColorDefault
        "defaultprimary" -> GlButtonDefaultPrimaryBackgroundColorDefault
        else -> Color.Transparent
    }
    val fg = when (variant + category) {
        "confirmprimary" -> GlButtonConfirmPrimaryForegroundColorDefault
        "dangerprimary" -> GlButtonDangerPrimaryForegroundColorDefault
        else -> GlButtonDefaultPrimaryForegroundColorDefault
    }
    Box(
        modifier = Modifier
            .background(bg, RoundedCornerShape(4.dp))
            .clickable(enabled = enabled) { onClick() }
            .padding(horizontal = if (size == "small") 8.dp else 12.dp, vertical = 6.dp),
    ) {
        Text(label, color = fg, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
    }
}
