import SwiftUI

// Pajamas-inspired (MIT)
// simple rows list

public struct GlTable: View {
  public var text: String = ""
  @Binding public var value: String
  public var disabled: Bool = false

  public init(text: String = "", value: Binding<String> = .constant(""), disabled: Bool = false) {
    self.text = text
    self._value = value
    self.disabled = disabled
  }

  public var body: some View {
    VStack(alignment: .leading, spacing: 0) {
      content
    }
    .overlay(RoundedRectangle(cornerRadius: Gl.radiusMd).strokeBorder(Gl.borderColorDefault, lineWidth: 1))
    .cornerRadius(Gl.radiusMd)
  }
}
