import SwiftUI

// Pajamas-inspired (MIT)

public struct GlBadge: View {
  public enum Variant: String, CaseIterable {
    case neutral, info, success, warning, danger, tier
  }

  public var variant: Variant = .neutral
  public var text: String

  public init(text: String, variant: Variant = .neutral) {
    self.text = text
    self.variant = variant
  }

  public var body: some View {
    Text(text)
      .font(.system(size: Gl.fontSizeSm, weight: .semibold))
      .padding(.horizontal, Gl.spacing2)
      .padding(.vertical, 2)
      .background(bg)
      .foregroundColor(fg)
      .cornerRadius(Gl.radiusFull)
  }

  private var bg: Color {
    switch variant {
    case .neutral: return Gl.badgeNeutralBackgroundColorDefault
    case .info: return Gl.badgeInfoBackgroundColorDefault
    case .success: return Gl.badgeSuccessBackgroundColorDefault
    case .warning: return Gl.badgeWarningBackgroundColorDefault
    case .danger: return Gl.badgeDangerBackgroundColorDefault
    case .tier: return Gl.badgeTierBackgroundColorDefault
    }
  }

  private var fg: Color {
    switch variant {
    case .neutral: return Gl.badgeNeutralTextColorDefault
    case .info: return Gl.badgeInfoTextColorDefault
    case .success: return Gl.badgeSuccessTextColorDefault
    case .warning: return Gl.badgeWarningTextColorDefault
    case .danger: return Gl.badgeDangerTextColorDefault
    case .tier: return Gl.badgeTierTextColorDefault
    }
  }
}
