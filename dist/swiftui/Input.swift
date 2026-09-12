import SwiftUI

// Pajamas-inspired (MIT)
// text field with focus ring

public struct GlInput: View {
  public var text: String = ""
  @Binding public var value: String
  public var disabled: Bool = false

  public init(text: String = "", value: Binding<String> = .constant(""), disabled: Bool = false) {
    self.text = text
    self._value = value
    self.disabled = disabled
  }

  public var body: some View {
    TextField(text, text: $value)
      .textFieldStyle(.plain)
      .font(.system(size: Gl.fontSizeBase))
      .padding(Gl.spacing3)
      .background(Gl.controlBackgroundColorDefault)
      .overlay(RoundedRectangle(cornerRadius: Gl.radiusMd).strokeBorder(Gl.controlBorderColorDefault, lineWidth: 1))
      .cornerRadius(Gl.radiusMd)
      .disabled(disabled)
  }
}
