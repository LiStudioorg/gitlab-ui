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
import androidx.compose.foundation.layout.height
@Composable
fun GlTabs(titles: List<String>,
    selected: Int = 0,
    onSelect: (Int) -> Unit = {}) {
    Row {
        titles.forEachIndexed { i, t ->
            Column(
                Modifier
                    .clickable { onSelect(i) }
                    .padding(horizontal = 12.dp, vertical = 8.dp),
            ) {
                Text(
                    t,
                    color = if (i == selected) GlTextColorStrong else GlTextColorSubtle,
                    fontWeight = if (i == selected) FontWeight.Bold else FontWeight.Normal,
                )
                if (i == selected) {
                    Box(Modifier.padding(top = 4.dp).height(2.dp).fillMaxWidth().background(GlTabSelectedIndicatorColorDefault))
                }
            }
        }
    }
}
