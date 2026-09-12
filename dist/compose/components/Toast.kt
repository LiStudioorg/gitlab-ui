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
import androidx.compose.foundation.layout.Arrangement
@Composable
fun GlToast(message: String,
    actionText: String? = null,
    onAction: () -> Unit = {}) {
    Row(
        Modifier
            .background(GlFeedbackStrongBackgroundColor, RoundedCornerShape(50))
            .padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text(message, color = GlFeedbackStrongTextColor, fontSize = 14.sp)
        if (actionText != null) {
            Text(actionText, color = GlFeedbackStrongLinkColor, fontSize = 14.sp,
                 fontWeight = FontWeight.Bold,
                 modifier = Modifier.clickable { onAction() })
        }
    }
}
