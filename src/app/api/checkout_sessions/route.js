import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';



export async function POST(request) {
  try {
    const headersList = await headers()
    const userSession = await auth.api.getSession({ headers: headersList })

    if (!userSession?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const service = String(formData.get('service') || 'Salon appointment').trim()
    const appointmentId = String(formData.get('appointmentId') || '')
    const price = Number(formData.get('price'))
    const unitAmount = Math.round(price * 100)

    if (!Number.isFinite(unitAmount) || unitAmount <= 0) {
      return NextResponse.json({ error: "Invalid service price" }, { status: 400 })
    }

    const origin = headersList.get('origin') || new URL(request.url).origin
    const appointmentQuery = appointmentId
      ? `&appointmentId=${encodeURIComponent(appointmentId)}`
      : ''
    const successUrl = `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&service=${encodeURIComponent(service)}&price=${encodeURIComponent(price.toFixed(2))}${appointmentQuery}`

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'SalonBook',
              description: `${service} appointment payment`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userSession?.user.email,
      metadata: {
        customerId: userSession.user.id,
        appointmentId,
      },
      success_url: successUrl,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: "salon_book_web_001",
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
