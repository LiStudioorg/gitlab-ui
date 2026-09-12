import SwiftUI

// Pajamas-inspired (MIT)
// floating pill

public struct GlToast: View {
  public var text: String = ""
  @Binding public var value: String
  public var disabled: Bool = false

  public init(text: String = "", value: Binding<String> = .constant(""), disabled: Bool = false) {
    self.text = text
    self._value = value
    self.disabled = disabled
  }

  public var body: some View {
    HStack(spacing: Gl.spacing3) {
      Text(text).font(.system(size: Gl.fontSizeBase)).foregroundColor(Gl.feedbackStrongTextColor)
      content
    }
    .padding(.horizontal, Gl.spacing5)
    .padding(.vertical, Gl.spacing4)
    .background(Gl.feedbackStrongBackgroundColor)
    .cornerRadius(Gl.radiusFull)
    .shadow(color: Color.black.opacity(0.16), radius: 4, y: 2)
  }
}
