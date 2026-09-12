import SwiftUI

// Pajamas-inspired (MIT)
// menu container

public struct GlDropdown: View {
  public var text: String = ""
  @Binding public var value: String
  public var disabled: Bool = false

  public init(text: String = "", value: Binding<String> = .constant(""), disabled: Bool = false) {
    self.text = text
    self._value = value
    self.disabled = disabled
  }

  public var body: some View {
    VStack(alignment: .leading, spacing: Gl.spacing1) {
      content
    }
    .padding(Gl.spacing2)
    .background(Gl.dropdownBackgroundColor)
    .cornerRadius(Gl.radiusLg)
    .shadow(color: Color.black.opacity(0.16), radius: 4, y: 2)
  }
}
