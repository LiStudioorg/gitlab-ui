import SwiftUI

// Pajamas-inspired (MIT)
// centered dialog card

public struct GlModal: View {
  public var text: String = ""
  @Binding public var value: String
  public var disabled: Bool = false

  public init(text: String = "", value: Binding<String> = .constant(""), disabled: Bool = false) {
    self.text = text
    self._value = value
    self.disabled = disabled
  }

  public var body: some View {
    VStack(alignment: .leading, spacing: Gl.spacing3) {
      Text(text).font(.system(size: 16, weight: .bold)).foregroundColor(Gl.textColorStrong)
      content
    }
    .padding(Gl.spacing5)
    .background(Gl.backgroundColorDefault)
    .cornerRadius(Gl.radiusLg)
    .shadow(color: Color.black.opacity(0.16), radius: 8, y: 2)
  }
}

public struct GlModalPreview {
  public static let demo: String = "Use GlModal inside a ZStack overlay"
}
