import SwiftUI

// Pajamas-inspired (MIT)
// label + field stack

public struct GlForm: View {
  public var text: String = ""
  @Binding public var value: String
  public var disabled: Bool = false

  public init(text: String = "", value: Binding<String> = .constant(""), disabled: Bool = false) {
    self.text = text
    self._value = value
    self.disabled = disabled
  }

  public var body: some View {
    VStack(alignment: .leading, spacing: Gl.spacing2) {
      content
    }
  }
}
