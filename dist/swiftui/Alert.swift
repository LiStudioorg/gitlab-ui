import SwiftUI

// Pajamas-inspired (MIT)

public struct GlAlert: View {
  public enum Variant: String { case info, success, warning, danger, tip }
  public var variant: Variant = .info
  public var title: String
  public var text: String
  @Binding public var isVisible: Bool

  public init(title: String, text: String, variant: Variant = .info, isVisible: Binding<Bool> = .constant(true)) {
    self.title = title
    self.text = text
    self.variant = variant
    self._isVisible = isVisible
  }

  public var body: some View {
    if isVisible {
      HStack(alignment: .top, spacing: Gl.spacing3) {
        VStack(alignment: .leading, spacing: Gl.spacing1) {
          Text(title).font(.system(size: Gl.fontSizeBase, weight: .bold)).foregroundColor(titleColor)
          Text(text).font(.system(size: Gl.fontSizeBase)).foregroundColor(Gl.textColorDefault)
        }
        Spacer()
        Button(action: { isVisible = false }) {
          Image(systemName: "xmark").font(.system(size: 12)).foregroundColor(Gl.textColorSubtle)
        }
        .buttonStyle(.plain)
      }
      .padding(Gl.spacing4)
      .background(bg)
      .overlay(RoundedRectangle(cornerRadius: Gl.radiusMd).strokeBorder(border, lineWidth: 1))
      .cornerRadius(Gl.radiusMd)
    }
  }

  private var bg: Color {
    switch variant {
    case .info: return Gl.alertInfoBackgroundColor
    case .success: return Gl.alertSuccessBackgroundColor
    case .warning: return Gl.alertWarningBackgroundColor
    case .danger: return Gl.alertDangerBackgroundColor
    case .tip: return Gl.alertNeutralBackgroundColor
    }
  }
  private var titleColor: Color {
    switch variant {
    case .info: return Gl.alertInfoTitleColor
    case .success: return Gl.alertSuccessTitleColor
    case .warning: return Gl.alertWarningTitleColor
    case .danger: return Gl.alertDangerTitleColor
    case .tip: return Gl.alertNeutralTitleColor
    }
  }
  private var border: Color { Gl.borderColorDefault }
}
