import SwiftUI

// Pajamas-inspired (MIT)
// underline tab strip

public struct GlTabs: View {
  public var text: String = ""
  @Binding public var value: String
  public var disabled: Bool = false

  public init(text: String = "", value: Binding<String> = .constant(""), disabled: Bool = false) {
    self.text = text
    self._value = value
    self.disabled = disabled
  }

  public var body: some View {
    HStack(spacing: Gl.spacing4) {
      content
    }
    .overlay(alignment: .bottom) { Rectangle().fill(Gl.borderColorDefault).frame(height: 1) }
  }
}
